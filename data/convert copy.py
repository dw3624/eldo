import pandas as pd

corps_df = pd.read_csv(
    "db/company_desc.csv", dtype={"stock_code": str, "corp_code": str}
)
corps_df = corps_df[["corp_code", "stock_code"]]

fs_df = pd.read_csv("db/kor-eldo-fs-251203.csv", dtype={"corp_code": str})

fs_df.columns = [
    "corp_code",
    "corp_name",
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


emsec_corps_df = pd.read_csv("db/emsec_corps.csv", dtype={"ticker": str})

emsec_corps_df.rename(columns={"ticker": "stock_code"}, inplace=True)
emsec_corps_df = emsec_corps_df.merge(corps_df, on="stock_code")
emsec_corps_df = emsec_corps_df.drop(columns=["corp_code", "company_name", "EMTEC"])
emsec_corps_df.rename(columns={"stock_code": "corp_ticker"}, inplace=True)

# 1️⃣ emsec / ratio 쌍을 모으기
emsec_cols = [
    col
    for col in emsec_corps_df.columns
    if col.startswith("EMSEC") and "_비중" not in col
]
ratio_cols = [col for col in emsec_corps_df.columns if "_비중" in col]

# 2️⃣ 각 쌍을 long 형태로 변환
rows = []
for _, row in emsec_corps_df.iterrows():
    for i in range(1, 5):
        emsec = row.get(f"EMSEC{i}")
        ratio = row.get(f"EMSEC{i}_비중(%)")
        if pd.notna(emsec):
            rows.append(
                {"corp_ticker": row["corp_ticker"], "emsec": emsec, "ratio": ratio}
            )

df_long = pd.DataFrame(rows)
df_long["rank"] = (
    df_long.groupby("corp_ticker")["ratio"]
    .rank(ascending=False, method="dense")
    .astype(int)
)

emsec_df = pd.read_csv("db/emsec.csv")
emsec_df.to_csv("db/emsecs.csv", index_label="id")
emsec_df = pd.read_csv("db/emsecs.csv")

emsec_code_map = dict(zip(emsec_df["sub_industry_en"], emsec_df["id"]))
df_long["emsec_id"] = df_long["emsec"].map(emsec_code_map)

df_long.drop(columns=["emsec"], inplace=True)
df_long.index.name = "id"
df_long.to_csv("db/corp_emsec.csv")


reports_df = pd.read_csv("db/reports_org.csv", dtype={"stock_code": str})
reports_df.drop(columns=["corp_code", "corp_name", "corp_cls"], inplace=True)
reports_df.rename(columns={"stock_code": "corp_ticker"}, inplace=True)
reports_df.to_csv("db/reports.csv", index=False)
