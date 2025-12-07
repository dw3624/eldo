import os

import pandas as pd

os.chdir("data/")

# emsec
emsec_df = pd.read_csv("org/emsec.csv")
emsec_df.index.name = "id"
emsec_df.to_csv("adj/emsec.csv")


# corps
corps_org_df = pd.read_csv("org/corps.csv", dtype={"stock_code": str, "corp_code": str})
corps_df = pd.DataFrame()
corps_df["stock_exchange"] = corps_org_df["corp_cls"]
corps_df["corp_ticker"] = corps_org_df["stock_code"]
corps_df["corp_name_listed"] = corps_org_df["stock_name"]
corps_df["corp_name_local"] = corps_org_df["corp_name"]
corps_df["corp_name_en"] = corps_org_df["corp_name_eng"]
corps_df["corp_id"] = corps_org_df["jurir_no"]
corps_df["biz_id"] = corps_org_df["bizr_no"]
corps_df["date_founded"] = corps_org_df["est_dt"]
corps_df["date_listed"] = corps_org_df["lst_dt"]
corps_df["status_listing"] = "ac"
corps_df["ceo_name"] = corps_org_df["ceo_nm"]
corps_df["addr_local"] = corps_org_df["adres"]
corps_df["homepage"] = corps_org_df["hm_url"]
corps_df["tel_no"] = corps_org_df["phn_no"]
corps_df["fax_no"] = corps_org_df["fax_no"]
corps_df["settle_period"] = corps_org_df["acc_mt"]
corps_df.to_csv("adj/corps.csv", index=False)


# corp_emsec
corp_emsec_df = pd.read_csv("org/corp_emsec.csv", dtype={"ticker": str})
corp_emsec_df = corp_emsec_df.rename(columns={"ticker": "corp_ticker"}).drop(
    columns=["company_name", "EMTEC"]
)

## 1. emsec / ratio 쌍을 모으기
emsec_cols = [
    col
    for col in corp_emsec_df.columns
    if col.startswith("EMSEC") and "_비중" not in col
]
ratio_cols = [col for col in corp_emsec_df.columns if "_비중" in col]

## 2. 각 쌍을 long 형태로 변환
rows = []
for _, row in corp_emsec_df.iterrows():
    for i in range(1, 5):
        emsec = row.get(f"EMSEC{i}")
        ratio = row.get(f"EMSEC{i}_비중(%)")
        if pd.notna(emsec):
            rows.append(
                {"corp_ticker": row["corp_ticker"], "emsec": emsec, "ratio": ratio}
            )

emsec_long = pd.DataFrame(rows)
emsec_long["rank"] = (
    emsec_long.groupby("corp_ticker")["ratio"]
    .rank(ascending=False, method="dense")
    .astype(int)
)

emsec_code_map = dict(zip(emsec_df["sub_industry_en"], emsec_df.index))
emsec_long["emsec_id"] = emsec_long["emsec"].map(emsec_code_map)

emsec_long.drop(columns=["emsec"], inplace=True)
emsec_long.index.name = "id"
emsec_long.to_csv("adj/corp_emsec.csv")


# reports
reports_df = pd.read_csv("org/reports.csv", dtype={"stock_code": str})
reports_df = reports_df.drop(columns=["corp_code", "corp_name", "corp_cls"]).rename(
    columns={"stock_code": "corp_ticker"}
)
reports_df = reports_df.rename(
    columns={
        "report_nm": "name",
        "rcept_no": "recept_no",
        "rcept_dt": "recept_date",
    }
)
reports_df.to_csv("adj/reports.csv", index=False)


# statements
stmt_df = pd.read_csv("org/statements.csv", dtype={"corp_code": str})
stmt_df["corp_code"] = stmt_df["corp_code"].map(lambda x: str(x).zfill(8))
corp_code_ticker_map = dict(zip(corps_org_df["corp_code"], corps_org_df["stock_code"]))
stmt_df["corp_ticker"] = stmt_df["corp_code"].map(corp_code_ticker_map)

stmt_df = stmt_df.rename(
    columns={
        "ELDOtag": "eldo_tag",
        "ELDOtag_source": "eldo_tag_src",
        "ELDO_val": "eldo_val",
        "FnGuide_val": "fn_guide_val",
        "fix_mask": "fix_mask",
        "unit_id": "unit",
    }
)
stmt_columns = [
    "corp_code",
    "corp_ticker",
    "eldo_tag",
    "eldo_tag_src",
    "eldo_val",
    "fn_guide_val",
    "fix_mask",
    "equal",
    "error_pct",
    "status",
    "start_date",
    "end_date",
    "instant_date",
    "unit",
    "decimals",
]
stmt_df = stmt_df[stmt_columns]
stmt_df.to_csv("adj/statements.csv", index=False)
