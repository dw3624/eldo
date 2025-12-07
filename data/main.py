"""
데이터베이스 업로드 스크립트 (init.sql 스키마 맞춤)
- 중복 방지를 위한 upsert 전략
- 모듈화된 구조
- 에러 복구 가능
"""

import uuid
from datetime import datetime
from typing import Dict, List, Optional

import pandas as pd
from sqlalchemy import create_engine, text

# ==================== 설정 ====================


class Config:
    DB_URL = "postgresql://user:postgres@localhost:5432/eldo"

    CSV_PATHS = {
        "corps": "data_adj/corps.csv",
        "emsec": "data_adj/emsec.csv",
        "corps_emsec": "data_adj/corp_emsec.csv",
        "financial_statements": "data_adj/statements.csv",
        "reports": "data_adj/reports.csv",
    }

    CHUNK_SIZE = 5000


engine = create_engine(Config.DB_URL)


# ==================== 유틸리티 함수 ====================


def generate_corp_uuid(corp_code: str) -> str:
    """corp_code로부터 deterministic UUID 생성"""
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, str(corp_code)))


def safe_datetime(date_str, format="%Y%m%d"):
    """안전한 날짜 변환"""
    return pd.to_datetime(date_str, format=format, errors="coerce")


def log_progress(message: str, level: str = "INFO"):
    """진행 상황 로깅"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    symbols = {"INFO": "ℹ", "SUCCESS": "✓", "WARNING": "⚠", "ERROR": "❌"}
    print(f"[{timestamp}] {symbols.get(level, '')} {message}")


# ==================== 1. EMSEC 마스터 데이터 ====================


class EmsecUploader:
    """EMSEC 산업분류 업로드"""

    @staticmethod
    def upload(csv_path: str) -> pd.DataFrame:
        log_progress("EMSEC 데이터 업로드 시작...")

        df = pd.read_csv(csv_path)
        df_upload = df

        # 업로드 (중복 시 스킵)
        try:
            df_upload.to_sql(
                "emsec", engine, if_exists="append", index=False, method="multi"
            )
            log_progress(f"{len(df_upload)}개 EMSEC 데이터 업로드 완료", "SUCCESS")
        except Exception as e:
            log_progress(f"EMSEC 업로드 중 일부 중복 데이터 스킵: {str(e)}", "WARNING")

        # 업로드된 데이터 조회 (ID 매핑용)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT id, code FROM emsec"))
            emsec_mapping = pd.DataFrame(result.fetchall(), columns=["id", "code"])

        return emsec_mapping


# ==================== 2. 기업 정보 업로드 ====================


class CorpsUploader:
    """기업 정보 업로드 - 멱등성 보장"""

    @staticmethod
    def load_csv(csv_path: str) -> pd.DataFrame:
        """CSV 로드 및 기본 전처리"""
        df = pd.read_csv(csv_path, dtype={"corp_ticker": str})
        df["id"] = df["corp_ticker"].apply(generate_corp_uuid)
        return df

    @staticmethod
    def prepare_corps_df(df: pd.DataFrame) -> pd.DataFrame:
        """corps 테이블용 DataFrame 생성"""
        exchange_map = {"Y": "kospi", "K": "kosdaq", "N": "nye", "Q": "nasdaq"}

        corps_df = df
        corps_df["stock_exchange"] = corps_df["stock_exchange"].map(exchange_map)
        corps_df["date_founded"] = safe_datetime(corps_df["date_founded"])
        corps_df["date_listed"] = safe_datetime(corps_df["date_listed"])

        return corps_df.where(pd.notna(corps_df), None)

    @staticmethod
    def upsert_corps(corps_df: pd.DataFrame):
        """UPSERT로 corps 데이터 업로드"""
        log_progress("기업 정보 업로드 시작...")

        success_count = 0
        error_count = 0

        with engine.begin() as conn:
            for _, row in corps_df.iterrows():
                try:
                    stmt = text(
                        """
                        INSERT INTO corps (
                            id, stock_exchange, corp_ticker, corp_name_listed,
                            corp_name_local, corp_name_en, corp_id, biz_id,
                            ceo_name, addr_local, homepage, tel_no, fax_no,
                            settle_period, date_founded, date_listed, status_listing
                        ) VALUES (
                            :id, :stock_exchange::stock_exchange_types, :corp_ticker, :corp_name_listed,
                            :corp_name_local, :corp_name_en, :corp_id, :biz_id,
                            :ceo_name, :addr_local, :homepage, :tel_no, :fax_no,
                            :settle_period, :date_founded, :date_listed, :status_listing::status_listing_types
                        )
                        ON CONFLICT (id) DO UPDATE SET
                            corp_name_local = EXCLUDED.corp_name_local,
                            corp_name_en = EXCLUDED.corp_name_en,
                            ceo_name = EXCLUDED.ceo_name,
                            homepage = EXCLUDED.homepage,
                            tel_no = EXCLUDED.tel_no,
                            addr_local = EXCLUDED.addr_local,
                            updated_at = CURRENT_TIMESTAMP
                    """
                    )
                    conn.execute(stmt, row.to_dict())
                    success_count += 1
                except Exception as e:
                    error_count += 1
                    if error_count <= 3:  # 처음 3개만 로그
                        log_progress(
                            f"기업 업로드 오류 (ID: {row['id']}): {str(e)}", "WARNING"
                        )

        log_progress(
            f"{success_count}개 기업 정보 업로드 완료 (오류: {error_count})", "SUCCESS"
        )

    @staticmethod
    def upload(csv_path: str) -> pd.DataFrame:
        """전체 업로드 프로세스"""
        df = CorpsUploader.load_csv(csv_path)
        corps_df = CorpsUploader.prepare_corps_df(df)
        CorpsUploader.upsert_corps(corps_df)

        # 매핑용 정보 반환
        result_df = pd.DataFrame(
            {
                "id": df["id"],
                "corp_ticker": df["stock_code"],
                "corp_name": df["corp_name"],
            }
        )
        return result_df


# ==================== 3. 기업-산업분류 관계 ====================


class CorpsEmsecUploader:
    """기업-산업분류 관계 업로드"""

    @staticmethod
    def upload(csv_path: str, corps_mapping: pd.DataFrame):
        log_progress("기업-산업분류 관계 업로드 시작...")

        df = pd.read_csv(csv_path, dtype={"corp_ticker": str})

        # corp_ticker → uuid 매핑
        corp_id_map = dict(zip(corps_mapping["corp_ticker"], corps_mapping["id"]))
        df["corp_id"] = df["corp_ticker"].map(corp_id_map)

        # 매핑 실패 체크
        missing = df[df["corp_id"].isna()]
        if not missing.empty:
            log_progress(
                f"{len(missing)}개 매핑 실패 (저장: missing_corps_emsec.csv)", "WARNING"
            )
            missing.to_csv("missing_corps_emsec.csv", index=False)

        df = df.dropna(subset=["corp_id"])

        success_count = 0
        error_count = 0

        with engine.begin() as conn:
            for _, row in df.iterrows():
                try:
                    stmt = text(
                        """
                        INSERT INTO corps_emsec (corp_id, emsec_id, ratio, rank)
                        VALUES (:corp_id::uuid, :emsec_id, :ratio, :rank)
                        ON CONFLICT (corp_id, emsec_id) DO UPDATE SET
                            ratio = EXCLUDED.ratio,
                            rank = EXCLUDED.rank
                    """
                    )
                    conn.execute(
                        stmt,
                        {
                            "corp_id": row["corp_id"],
                            "emsec_id": int(row["emsec_id"]),
                            "ratio": row.get("ratio"),
                            "rank": row.get("rank"),
                        },
                    )
                    success_count += 1
                except Exception as e:
                    error_count += 1
                    if error_count <= 3:
                        log_progress(f"관계 업로드 오류: {str(e)}", "WARNING")

        log_progress(
            f"{success_count}개 관계 업로드 완료 (오류: {error_count})", "SUCCESS"
        )


# ==================== 4. 재무제표 업로드 ====================


class FinancialStatementsUploader:
    """재무제표 및 보고서 업로드"""

    @staticmethod
    def upload_reports(csv_path: str, corps_mapping: pd.DataFrame) -> pd.DataFrame:
        """보고서 메타데이터 업로드"""
        log_progress("보고서 메타데이터 업로드 시작...")

        df = pd.read_csv(csv_path, dtype={"corp_ticker": str})

        # corp_ticker → uuid 매핑
        corp_ticker_id_map = dict(
            zip(corps_mapping["corp_ticker"], corps_mapping["id"])
        )
        df["corp_id"] = df["corp_ticker"].map(corp_ticker_id_map)

        # 매핑 실패 체크
        missing = df[df["corp_id"].isna()]
        if not missing.empty:
            log_progress(
                f"{len(missing)}개 보고서 매핑 실패 (저장: missing_reports.csv)",
                "WARNING",
            )
            missing.to_csv("missing_reports.csv", index=False)

        df = df[df["corp_id"].notna()]
        df = df.drop(columns=["corp_ticker"])
        df["recept_date"] = safe_datetime(df["recept_date"])

        success_count = 0
        error_count = 0
        report_ids = []

        with engine.begin() as conn:
            for _, row in df.iterrows():
                try:
                    stmt = text(
                        """
                        INSERT INTO reports (corp_id, name, recept_no, flr_nm, recept_date, rm)
                        VALUES (:corp_id::uuid, :name, :recept_no, :flr_nm, :recept_date, :rm)
                        ON CONFLICT (recept_no) DO UPDATE SET
                            name = EXCLUDED.name,
                            flr_nm = EXCLUDED.flr_nm,
                            recept_date = EXCLUDED.recept_date,
                            rm = EXCLUDED.rm
                        RETURNING id
                    """
                    )
                    result = conn.execute(
                        stmt,
                        {
                            "corp_id": row["corp_id"],
                            "name": row["report_nm"],
                            "recept_no": row["rcept_no"],
                            "flr_nm": row.get("flr_nm"),
                            "recept_date": row["recept_date"],
                            "rm": row.get("rm"),
                        },
                    )
                    report_id = result.scalar()
                    report_ids.append({"rcept_no": row["rcept_no"], "id": report_id})
                    success_count += 1
                except Exception as e:
                    error_count += 1
                    if error_count <= 3:
                        log_progress(f"보고서 업로드 오류: {str(e)}", "WARNING")

        log_progress(
            f"{success_count}개 보고서 업로드 완료 (오류: {error_count})", "SUCCESS"
        )

        # ID 매핑 DataFrame 생성
        reports_mapping = pd.DataFrame(report_ids)
        return reports_mapping

    @staticmethod
    def upload_statements(
        csv_path: str, corps_mapping: pd.DataFrame, reports_mapping: pd.DataFrame
    ):
        """재무제표 상세 항목 업로드"""
        log_progress("재무제표 항목 업로드 시작...")

        df = pd.read_csv(csv_path, dtype={"corp_code": str})

        # corp_code → uuid 매핑
        corp_code_id_map = dict(zip(corps_mapping["corp_code"], corps_mapping["id"]))
        df["corp_id"] = df["corp_code"].map(corp_code_id_map)

        # report_id 매핑 (rcept_no 기준)
        report_id_map = dict(zip(reports_mapping["rcept_no"], reports_mapping["id"]))
        df["report_id"] = df["rcept_no"].map(report_id_map)

        # 매핑 실패 체크
        before_count = len(df)
        df = df.dropna(subset=["corp_id", "report_id"])
        after_count = len(df)

        if before_count > after_count:
            log_progress(
                f"{before_count - after_count}개 재무제표 매핑 실패", "WARNING"
            )

        # statements DataFrame 생성
        statements_df = pd.DataFrame(
            {
                "report_id": df["report_id"].astype(int),
                "corp_id": df["corp_id"],
                "eldo_tag": df["ELDOtag"],
                "eldo_tag_src": df["ELDOtag_source"],
                "eldo_val": pd.to_numeric(df["ELDO_val"], errors="coerce"),
                "fn_guide_val": pd.to_numeric(df["FnGuide_val"], errors="coerce"),
                "fix_mask": df["fix_mask"],
                "equal": df["equal"].map(
                    {"Y": True, "N": False, True: True, False: False}
                ),
                "error_pct": pd.to_numeric(df["error_pct"], errors="coerce"),
                "status": df["status"],
                "start_date": safe_datetime(df["start_date"]),
                "end_date": safe_datetime(df["end_date"]),
                "instant_date": safe_datetime(df["instant_date"]),
                "unit": df["unit_id"],
                "decimals": pd.to_numeric(df["decimals"], errors="coerce"),
            }
        )

        # 청크 단위로 업로드
        chunk_size = Config.CHUNK_SIZE
        total_chunks = (len(statements_df) + chunk_size - 1) // chunk_size

        total_success = 0
        for i in range(0, len(statements_df), chunk_size):
            chunk = statements_df.iloc[i : i + chunk_size]
            try:
                chunk.to_sql(
                    "statements",
                    engine,
                    if_exists="append",
                    index=False,
                    method="multi",
                )
                total_success += len(chunk)
                log_progress(f"청크 {i//chunk_size + 1}/{total_chunks} 업로드 완료")
            except Exception as e:
                log_progress(
                    f"청크 {i//chunk_size + 1} 업로드 오류: {str(e)}", "WARNING"
                )

        log_progress(f"{total_success}개 재무제표 항목 업로드 완료", "SUCCESS")

    @staticmethod
    def upload(fs_csv_path: str, rp_csv_path: str, corps_mapping: pd.DataFrame):
        """전체 재무제표 업로드 프로세스"""
        reports_mapping = FinancialStatementsUploader.upload_reports(
            rp_csv_path, corps_mapping
        )
        FinancialStatementsUploader.upload_statements(
            fs_csv_path, corps_mapping, reports_mapping
        )


# ==================== 5. 메인 실행 ====================


class DataUploadOrchestrator:
    """전체 데이터 업로드 오케스트레이터"""

    @staticmethod
    def check_database():
        """데이터베이스 연결 확인"""
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            log_progress("데이터베이스 연결 확인", "SUCCESS")
            return True
        except Exception as e:
            log_progress(f"데이터베이스 연결 실패: {str(e)}", "ERROR")
            return False

    @staticmethod
    def run_full_upload():
        """전체 업로드 프로세스 실행"""
        if not DataUploadOrchestrator.check_database():
            return False

        log_progress("=== 데이터 업로드 시작 ===")
        start_time = datetime.now()

        try:
            # 1. EMSEC 마스터 데이터
            emsec_mapping = EmsecUploader.upload(Config.CSV_PATHS["emsec"])

            # 2. 기업 정보 (멱등성 보장)
            corps_mapping = CorpsUploader.upload(Config.CSV_PATHS["corps"])

            # 3. 기업-산업분류 관계
            CorpsEmsecUploader.upload(Config.CSV_PATHS["corps_emsec"], corps_mapping)

            # 4. 재무제표
            FinancialStatementsUploader.upload(
                Config.CSV_PATHS["financial_statements"],
                Config.CSV_PATHS["reports"],
                corps_mapping,
            )

            elapsed = (datetime.now() - start_time).total_seconds()
            log_progress(
                f"=== 모든 데이터 업로드 완료 (소요시간: {elapsed:.1f}초) ===",
                "SUCCESS",
            )
            return True

        except Exception as e:
            log_progress(f"업로드 중 오류 발생: {str(e)}", "ERROR")
            import traceback

            traceback.print_exc()
            return False

    @staticmethod
    def run_partial_upload(components: List[str]):
        """특정 컴포넌트만 업로드"""
        if not DataUploadOrchestrator.check_database():
            return False

        log_progress(f"=== 부분 업로드 시작: {', '.join(components)} ===")

        corps_mapping = None

        try:
            if "emsec" in components:
                EmsecUploader.upload(Config.CSV_PATHS["emsec"])

            if "corps" in components or any(
                c in components for c in ["corps_emsec", "financial"]
            ):
                corps_mapping = CorpsUploader.upload(Config.CSV_PATHS["corps"])

            if "corps_emsec" in components:
                if corps_mapping is None:
                    df = CorpsUploader.load_csv(Config.CSV_PATHS["corps"])
                    corps_mapping = pd.DataFrame(
                        {
                            "corp_code": df["corp_code"],
                            "corp_ticker": df["stock_code"],
                            "id": df["id"],
                        }
                    )
                CorpsEmsecUploader.upload(
                    Config.CSV_PATHS["corps_emsec"], corps_mapping
                )

            if "financial" in components:
                if corps_mapping is None:
                    df = CorpsUploader.load_csv(Config.CSV_PATHS["corps"])
                    corps_mapping = pd.DataFrame(
                        {
                            "corp_code": df["corp_code"],
                            "corp_ticker": df["stock_code"],
                            "id": df["id"],
                        }
                    )
                FinancialStatementsUploader.upload(
                    Config.CSV_PATHS["financial_statements"],
                    Config.CSV_PATHS["reports"],
                    corps_mapping,
                )

            log_progress("=== 부분 업로드 완료 ===", "SUCCESS")
            return True

        except Exception as e:
            log_progress(f"부분 업로드 중 오류 발생: {str(e)}", "ERROR")
            import traceback

            traceback.print_exc()
            return False


# ==================== 실행 ====================

if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        # 부분 업로드: python script.py corps financial
        components = sys.argv[1:]
        DataUploadOrchestrator.run_partial_upload(components)
    else:
        # 전체 업로드
        DataUploadOrchestrator.run_full_upload()
