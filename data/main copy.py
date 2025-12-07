import uuid
from datetime import datetime
from typing import Dict, List

import pandas as pd
from sqlalchemy import create_engine, text

# DB 연결
engine = create_engine("postgresql://user:postgres@localhost:5432/eldo")


def upload_emsec_data(csv_path: str):
    df = pd.read_csv(csv_path)
    df["id"] = list(range(0, len(df)))
    df.to_sql("emsec", engine, if_exists="append", index=False)

    print(f"✓ {len(df)} 개 EMSEC 정보 업로드 완료")

    return df


# ==================== 1. 기업 개요 데이터 업로드 ====================


def upload_corps_data(csv_path: str):
    """기업 개요 CSV를 corps 테이블에 업로드"""

    # CSV 읽기
    df = pd.read_csv(csv_path, dtype={"corp_code": str, "stock_code": str})

    # 1단계: corps 테이블 데이터 준비
    corps_df = pd.DataFrame()

    # UUID 생성 (corp_code 기반)
    corps_df["id"] = df["corp_code"].apply(
        lambda x: str(uuid.uuid5(uuid.NAMESPACE_DNS, str(x)))
    )

    # stock_exchange enum 변환
    exchange_map = {"Y": "kospi", "K": "kosdaq", "N": "nye", "Q": "nasdaq"}
    corps_df["stock_exchange"] = df["corp_cls"].map(exchange_map)

    # 기본 정보 매핑
    corps_df["corp_ticker"] = df["stock_code"]
    corps_df["corp_name_listed"] = df["stock_name"]
    corps_df["corp_name_local"] = df["corp_name"]
    corps_df["corp_name_en"] = df["corp_name_eng"]
    corps_df["corp_id"] = df["jurir_no"]
    corps_df["biz_id"] = df["bizr_no"]
    corps_df["ceo_name"] = df["ceo_nm"]
    corps_df["addr_local"] = df["adres"]
    corps_df["homepage"] = df["hm_url"]
    corps_df["tel_no"] = df["phn_no"]
    corps_df["fax_no"] = df["fax_no"]
    corps_df["settle_period"] = df["acc_mt"]

    # 날짜 변환 (YYYYMMDD → datetime)
    corps_df["date_founded"] = pd.to_datetime(
        df["est_dt"], format="%Y%m%d", errors="coerce"
    )
    corps_df["date_listed"] = pd.to_datetime(
        df["lst_dt"], format="%Y%m%d", errors="coerce"
    )

    # status_listing 설정 (기본값 'ac')
    corps_df["status_listing"] = "ac"

    # NULL 처리
    corps_df = corps_df.where(pd.notna(corps_df), None)

    # corps 테이블 업로드
    corps_df.to_sql("corps", engine, if_exists="append", index=False)

    print(f"✓ {len(corps_df)} 개 기업 정보 업로드 완료")
    corps_df["corp_code"] = df["corp_code"]

    # 2단계: corps_historys 업로드 (CEO 이력)
    # upload_corps_historys(df, corps_df)

    return corps_df


# ==================== 2. 재무제표 데이터 업로드 ====================


def upload_financial_statements(
    fs_csv_path: str, rp_csv_path: str, corps_df: pd.DataFrame
):
    """재무제표 CSV를 reports, statements 테이블에 업로드"""

    corp_ticker_id_map = dict(zip(corps_df["corp_ticker"], corps_df["id"]))

    reports_df = pd.read_csv(rp_csv_path, dtype={"corp_ticker": str})
    reports_df["corp_id"] = reports_df["corp_ticker"].map(corp_ticker_id_map)
    missing = reports_df[reports_df["corp_id"].isna()]
    if not missing.empty:
        print("⚠ 매핑 실패한 corp_ticker 목록:")
        print(missing["corp_ticker"].drop_duplicates())
        # 필요하면 파일로 저장해서 수동으로 확인
        missing.to_csv("missing_reports_corp_id.csv", index=False)

    reports_df = reports_df.drop(columns=["corp_ticker"])
    reports_df["rcept_dt"] = pd.to_datetime(reports_df["rcept_dt"], format="%Y%m%d")
    reports_df.rename(
        columns={
            "report_nm": "name",
            "rcept_no": "recept_no",
            "rcept_dt": "recept_date",
        },
        inplace=True,
    )

    reports_df = reports_df[reports_df["corp_id"].notna()]
    reports_df["id"] = list(range(len(reports_df)))

    reports_df.to_sql("reports", engine, if_exists="append", index=False)

    print(f"✓ {len(reports_df)} 개 보고서 업로드 완료")

    corp_code_id_map = dict(zip(corps_df["corp_code"], corps_df["id"]))

    df = pd.read_csv(fs_csv_path, dtype={"corp_code": str})
    df["corp_id"] = df["corp_code"].map(corp_code_id_map)
    df = df.dropna(subset=["corp_id"])

    report_id_map = dict(zip(reports_df["corp_id"], reports_df["id"]))
    statements_df = create_statements_table(df, report_id_map)
    statements_df.to_sql("statements", engine, if_exists="append", index=False)

    print(f"✓ {len(statements_df)} 개 재무제표 항목 업로드 완료")


def create_statements_table(
    df: pd.DataFrame, report_id_map: Dict[str, int]
) -> pd.DataFrame:
    """statements 테이블 데이터 생성"""

    statements_df = pd.DataFrame()

    # report_no 매핑
    statements_df["report_id"] = df["corp_id"].map(report_id_map)

    # 재무제표 항목 매핑
    statements_df["eldo_tag"] = df["ELDOtag"]
    statements_df["eldo_tag_src"] = df["ELDOtag_source"]
    statements_df["eldo_val"] = pd.to_numeric(df["ELDO_val"], errors="coerce")
    statements_df["fn_guide_val"] = pd.to_numeric(df["FnGuide_val"], errors="coerce")

    # 메타 데이터
    statements_df["fix_mask"] = df["fix_mask"]
    statements_df["equal"] = df["equal"]
    statements_df["error_pct"] = pd.to_numeric(df["error_pct"], errors="coerce")
    statements_df["status"] = df["status"]

    # 기간 정보
    statements_df["start_date"] = pd.to_datetime(
        df["start_date"], format="%Y%m%d", errors="coerce"
    )
    statements_df["end_date"] = pd.to_datetime(
        df["end_date"], format="%Y%m%d", errors="coerce"
    )
    statements_df["instant_date"] = pd.to_datetime(
        df["instant_date"], format="%Y%m%d", errors="coerce"
    )

    # 단위 정보
    statements_df["unit"] = df["unit_id"]
    statements_df["decimals"] = pd.to_numeric(df["decimals"], errors="coerce")

    # 매핑 실패한 행 제거
    statements_df = statements_df.dropna(subset=["report_id"])

    return statements_df


# ==================== 3. 관계 데이터 업로드 ====================


def upload_corps_emsec(csv_path: str, corps_df: pd.DataFrame):
    # CSV 읽기
    df = pd.read_csv(csv_path, dtype={"corp_ticker": str})

    # corp_code → uuid 매핑
    corp_id_map = dict(zip(corps_df["corp_ticker"], corps_df["id"]))
    df["corp_id"] = df["corp_ticker"].map(corp_id_map)

    df = df.dropna(subset=["corp_id"])
    corps_emsec_df = df.drop(columns=["corp_ticker"])
    corps_emsec_df.to_sql("corps_emsec", engine, if_exists="append", index=False)

    print(f"✓ {len(corps_emsec_df)} 개 corps-emsec 항목 업로드 완료")


# ==================== 4. 트랜잭션 전체 실행 ====================


def main_with_transaction():
    """트랜잭션으로 전체 업로드 (실패 시 롤백)"""

    with engine.begin() as conn:
        try:
            # 모든 업로드 작업을 하나의 트랜잭션으로
            corps_df = upload_corps_data("company_desc.csv")
            upload_emsec_data("emsec.csv")
            upload_corps_emsec("corp_emsec.csv", corps_df)
            upload_financial_statements(
                fs_csv_path="kor-eldo-fs-251203.csv",
                rp_csv_path="reports.csv",
                corps_df=corps_df,
            )

            # 성공 시 자동 커밋
            print("✓ 모든 데이터 업로드 완료 (커밋됨)")

        except Exception as e:
            # 실패 시 자동 롤백
            print(f"❌ 오류 발생, 롤백: {str(e)}")
            raise


if __name__ == "__main__":
    main_with_transaction()
