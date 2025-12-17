-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "corps_sizes" AS ENUM ('le', 'me', 'sm', 'vs');

-- CreateEnum
CREATE TYPE "event_codes" AS ENUM ('div', 'bon', 'rig', 'spl', 'rev', 'red', 'mer', 'spi', 'exd', 'sus', 'del', 'new');

-- CreateEnum
CREATE TYPE "history_types" AS ENUM ('corp', 'ceo');

-- CreateEnum
CREATE TYPE "status_listing_types" AS ENUM ('ac', 'su', 'de');

-- CreateEnum
CREATE TYPE "stock_exchange_types" AS ENUM ('krx', 'kosdaq', 'kospi', 'nye', 'nasdaq');

-- CreateTable
CREATE TABLE "corps" (
    "id" UUID NOT NULL,
    "stock_exchange" "stock_exchange_types",
    "corp_ticker" VARCHAR(20),
    "corp_name_listed" VARCHAR(200),
    "corp_name_local" VARCHAR(200),
    "corp_name_en" VARCHAR(200),
    "country_code" VARCHAR(3),
    "region_large" VARCHAR(50),
    "region_detail" VARCHAR(100),
    "corp_id" VARCHAR(50),
    "biz_id" VARCHAR(50),
    "date_founded" TIMESTAMP(6),
    "date_listed" TIMESTAMP(6),
    "status_listing" "status_listing_types" DEFAULT 'ac',
    "date_suspended" TIMESTAMP(6),
    "date_resumption" TIMESTAMP(6),
    "cnt_suspended" INTEGER DEFAULT 0,
    "status_date" TIMESTAMP(6),
    "corp_size" "corps_sizes",
    "group_name" VARCHAR(200),
    "major_holder" VARCHAR(200),
    "ceo_name" VARCHAR(100),
    "addr_local" TEXT,
    "addr_en" TEXT,
    "homepage" VARCHAR(500),
    "email_addr" VARCHAR(200),
    "tel_no" VARCHAR(50),
    "fax_no" VARCHAR(50),
    "industry_code" VARCHAR(20),
    "settle_period" VARCHAR(20),
    "biz_overview" TEXT,
    "sales_info" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corps_emsec" (
    "id" SERIAL NOT NULL,
    "corp_id" UUID NOT NULL,
    "emsec_id" INTEGER NOT NULL,
    "ratio" DECIMAL(10,4),
    "rank" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corps_emsec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corps_historys" (
    "id" SERIAL NOT NULL,
    "corp_id" UUID NOT NULL,
    "type" "history_types" NOT NULL,
    "order_seq" INTEGER NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "change_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corps_historys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emsec" (
    "id" SERIAL NOT NULL,
    "sector" VARCHAR(100),
    "sector_en" VARCHAR(100),
    "industry" VARCHAR(100),
    "industry_en" VARCHAR(100),
    "sub_industry" VARCHAR(100),
    "sub_industry_en" VARCHAR(100),
    "code" VARCHAR(20),
    "caption" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emsec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicators" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "corp_id" UUID NOT NULL,
    "market_cap_end" DECIMAL(20,2),
    "market_cap_open" DECIMAL(20,2),
    "market_cap_high" DECIMAL(20,2),
    "market_cap_low" DECIMAL(20,2),
    "market_cap_avg" DECIMAL(20,2),
    "market_cap_prev" DECIMAL(20,2),
    "ev_end" DECIMAL(20,2),
    "ev_end_avg" DECIMAL(20,2),
    "ev_prev" DECIMAL(20,2),
    "sps" DECIMAL(20,4),
    "ebitdaps" DECIMAL(20,4),
    "eps" DECIMAL(20,4),
    "cfps" DECIMAL(20,4),
    "bps" DECIMAL(20,4),
    "psr_end" DECIMAL(20,4),
    "psr_avg" DECIMAL(20,4),
    "psr_prev" DECIMAL(20,4),
    "per_end" DECIMAL(20,4),
    "per_avg" DECIMAL(20,4),
    "per_prev" DECIMAL(20,4),
    "pcr_end" DECIMAL(20,4),
    "pcr_avg" DECIMAL(20,4),
    "pcr_prev" DECIMAL(20,4),
    "ev_sales_end" DECIMAL(20,4),
    "ev_sales_avg" DECIMAL(20,4),
    "ev_sales_prev" DECIMAL(20,4),
    "ev_ebitda_end" DECIMAL(20,4),
    "ev_ebitda_avg" DECIMAL(20,4),
    "ev_ebitda_prev" DECIMAL(20,4),
    "pbr_end" DECIMAL(20,4),
    "pbr_avg" DECIMAL(20,4),
    "pbr_prev" DECIMAL(20,4),
    "gpm" DECIMAL(10,4),
    "opm" DECIMAL(10,4),
    "npm" DECIMAL(10,4),
    "ebitda_margin" DECIMAL(10,4),
    "roe" DECIMAL(10,4),
    "roa" DECIMAL(10,4),
    "roic" DECIMAL(10,4),
    "wacc" DECIMAL(10,4),
    "revenue_growth_rate" DECIMAL(10,4),
    "operating_profit_growth_rate" DECIMAL(10,4),
    "ebitda_growth_rate" DECIMAL(10,4),
    "net_income_growth_rate" DECIMAL(10,4),
    "cfo_growth_rate" DECIMAL(10,4),
    "equity_growth_rate" DECIMAL(10,4),
    "operating_margin_growth_rate" DECIMAL(10,4),
    "ebitda_margin_growth_rate" DECIMAL(10,4),
    "net_margin_growth_rate" DECIMAL(10,4),
    "revenue_status" VARCHAR(10),
    "operating_profit_status" VARCHAR(10),
    "ebitda_status" VARCHAR(10),
    "net_income_status" VARCHAR(10),
    "revenue_pattern_3y" VARCHAR(10),
    "operating_profit_pattern_3y" VARCHAR(10),
    "ebitda_pattern_3y" VARCHAR(10),
    "net_income_pattern_3y" VARCHAR(10),
    "revenue_cagr_3y" DECIMAL(10,4),
    "operating_profit_cagr_3y" DECIMAL(10,4),
    "operating_margin_cagr_3y" DECIMAL(10,4),
    "ebitda_cagr_3y" DECIMAL(10,4),
    "ebitda_margin_cagr_3y" DECIMAL(10,4),
    "net_income_cagr_3y" DECIMAL(10,4),
    "net_margin_cagr_3y" DECIMAL(10,4),
    "cfo_cagr_3y" DECIMAL(10,4),
    "equity_cagr_3y" DECIMAL(10,4),
    "revenue_cagr_5y" DECIMAL(10,4),
    "operating_profit_cagr_5y" DECIMAL(10,4),
    "operating_margin_cagr_5y" DECIMAL(10,4),
    "ebitda_cagr_5y" DECIMAL(10,4),
    "ebitda_margin_cagr_5y" DECIMAL(10,4),
    "net_income_cagr_5y" DECIMAL(10,4),
    "net_margin_cagr_5y" DECIMAL(10,4),
    "cfo_cagr_5y" DECIMAL(10,4),
    "equity_cagr_5y" DECIMAL(10,4),
    "debt_to_equity_ratio" DECIMAL(10,4),
    "equity_ratio" DECIMAL(10,4),
    "net_debt_ratio" DECIMAL(10,4),
    "current_ratio" DECIMAL(10,4),
    "current_liabilities_ratio" DECIMAL(10,4),
    "capital_retention_ratio" DECIMAL(10,4),
    "interest_coverage_ratio" DECIMAL(10,4),
    "debt_to_equity_ratio_growth_rate" DECIMAL(10,4),
    "equity_ratio_growth_rate" DECIMAL(10,4),
    "net_debt_ratio_growth_rate" DECIMAL(10,4),
    "debt_to_equity_ratio_cagr_3y" DECIMAL(10,4),
    "equity_ratio_cagr_3y" DECIMAL(10,4),
    "net_debt_ratio_cagr_3y" DECIMAL(10,4),
    "debt_to_equity_ratio_cagr_5y" DECIMAL(10,4),
    "equity_ratio_cagr_5y" DECIMAL(10,4),
    "net_debt_ratio_cagr_5y" DECIMAL(10,4),
    "ttl_asset_turnover" DECIMAL(10,4),
    "ttl_liability_turnover" DECIMAL(10,4),
    "equity_turnover" DECIMAL(10,4),
    "fixed_asset_turnover" DECIMAL(10,4),
    "ar_turnover" DECIMAL(10,4),
    "inventory_turnover" DECIMAL(10,4),
    "ap_turnover" DECIMAL(10,4),
    "dividend_payout_ratio" DECIMAL(10,4),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "corp_id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "recept_no" VARCHAR(100),
    "flr_nm" VARCHAR(100),
    "recept_date" TIMESTAMP(6) NOT NULL,
    "rm" VARCHAR(50),
    "fiscal_no" INTEGER,
    "period_start" TIMESTAMP(6),
    "period_end" TIMESTAMP(6),
    "currency" VARCHAR(20),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statements" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "corp_id" UUID NOT NULL,
    "assets_ttl" DECIMAL(20,2),
    "assets_current" DECIMAL(20,2),
    "cash_ttl" DECIMAL(20,2),
    "ar_ttl" DECIMAL(20,2),
    "inventory_ttl" DECIMAL(20,2),
    "assets_tangible_ttl" DECIMAL(20,2),
    "assets_intangible_ttl" DECIMAL(20,2),
    "liabilities_ttl" DECIMAL(20,2),
    "liabilities_current" DECIMAL(20,2),
    "accounts_payable_ttl" DECIMAL(20,2),
    "debt_interest_ttl" DECIMAL(20,2),
    "equity_ttl" DECIMAL(20,2),
    "equity_common" DECIMAL(20,2),
    "capital_paid_in" DECIMAL(20,2),
    "capital_preferred" DECIMAL(20,2),
    "capital_common" DECIMAL(20,2),
    "rtd_earnings_ttl" DECIMAL(20,2),
    "capital_surplus_ttl" DECIMAL(20,2),
    "surplus_ttl" DECIMAL(20,2),
    "net_borrowing" DECIMAL(20,2),
    "nwc" DECIMAL(20,2),
    "cfo_ttl" DECIMAL(20,2),
    "depreciation_ttl" DECIMAL(20,2),
    "cfi_ttl" DECIMAL(20,2),
    "capex" DECIMAL(20,2),
    "cff_ttl" DECIMAL(20,2),
    "dividends_ttl" DECIMAL(20,2),
    "revenue" DECIMAL(20,2),
    "cogs" DECIMAL(20,2),
    "sga_ttl" DECIMAL(20,2),
    "operating_profit" DECIMAL(20,2),
    "tax_expense" DECIMAL(20,2),
    "net_income" DECIMAL(20,2),
    "net_income_ctrl" DECIMAL(20,2),
    "ebitda" DECIMAL(20,2),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_event_types" (
    "id" SERIAL NOT NULL,
    "code" "event_codes" NOT NULL,
    "name" VARCHAR(100),
    "code_name" VARCHAR(100),
    "adj_required" BOOLEAN DEFAULT false,
    "caption" TEXT,

    CONSTRAINT "stock_event_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_events" (
    "id" SERIAL NOT NULL,
    "corp_id" UUID NOT NULL,
    "event_date" DATE NOT NULL,
    "event_id" INTEGER NOT NULL,
    "event_detail" TEXT,
    "adj_required" BOOLEAN DEFAULT false,
    "price_close_ex_right" DECIMAL(15,2),
    "price_base_ex_right" DECIMAL(15,2),
    "cash_dividend" DECIMAL(15,2),
    "adj_factor" DECIMAL(10,6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_trades" (
    "id" SERIAL NOT NULL,
    "corp_id" UUID NOT NULL,
    "trade_date" DATE NOT NULL,
    "currency" VARCHAR(3) DEFAULT 'KRW',
    "floating_shares" BIGINT,
    "share_listed" BIGINT,
    "trade_volume" BIGINT,
    "trade_value" DECIMAL(15,2),
    "price_close_raw" DECIMAL(15,2),
    "price_open_raw" DECIMAL(15,2),
    "price_high_raw" DECIMAL(15,2),
    "price_low_raw" DECIMAL(15,2),
    "market_cap_raw" DECIMAL(20,2),
    "fluc_tp_cd" DECIMAL(20,2),
    "change" DECIMAL(20,2),
    "fluc_rt" DECIMAL(20,2),
    "price_close_adj" DECIMAL(15,2),
    "price_open_adj" DECIMAL(15,2),
    "price_high_adj" DECIMAL(15,2),
    "price_low_adj" DECIMAL(15,2),
    "market_cap_adj" DECIMAL(20,2),
    "net_debt" DECIMAL(20,2),
    "enterprise_value" DECIMAL(20,2),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_trades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_corps_exchange" ON "corps"("stock_exchange");

-- CreateIndex
CREATE INDEX "idx_corps_name" ON "corps"("corp_name_local");

-- CreateIndex
CREATE INDEX "idx_corps_status" ON "corps"("status_listing");

-- CreateIndex
CREATE INDEX "idx_corps_ticker" ON "corps"("corp_ticker");

-- CreateIndex
CREATE UNIQUE INDEX "uk_corp_ticker" ON "corps"("stock_exchange", "corp_ticker");

-- CreateIndex
CREATE UNIQUE INDEX "uk_corp_emsec" ON "corps_emsec"("corp_id", "emsec_id", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "uk_corp_history" ON "corps_historys"("corp_id", "type", "order_seq");

-- CreateIndex
CREATE UNIQUE INDEX "uk_indicator" ON "indicators"("report_id");

-- CreateIndex
CREATE INDEX "idx_reports_corp" ON "reports"("corp_id");

-- CreateIndex
CREATE INDEX "idx_reports_corp_date" ON "reports"("corp_id", "recept_date" DESC);

-- CreateIndex
CREATE INDEX "idx_reports_date" ON "reports"("recept_date");

-- CreateIndex
CREATE UNIQUE INDEX "uk_report" ON "reports"("corp_id", "recept_no", "name");

-- CreateIndex
CREATE INDEX "idx_statements_corp" ON "statements"("corp_id");

-- CreateIndex
CREATE INDEX "idx_statements_report" ON "statements"("report_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_statement" ON "statements"("corp_id", "report_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_event_types_code_key" ON "stock_event_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "uk_stock_event" ON "stock_events"("corp_id", "event_date", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk_stock_trade" ON "stock_trades"("corp_id", "trade_date");

-- AddForeignKey
ALTER TABLE "corps_emsec" ADD CONSTRAINT "corps_emsec_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "corps_emsec" ADD CONSTRAINT "corps_emsec_emsec_id_fkey" FOREIGN KEY ("emsec_id") REFERENCES "emsec"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "corps_historys" ADD CONSTRAINT "corps_historys_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "indicators" ADD CONSTRAINT "indicators_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "indicators" ADD CONSTRAINT "indicators_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "statements" ADD CONSTRAINT "statements_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "statements" ADD CONSTRAINT "statements_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_events" ADD CONSTRAINT "stock_events_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_events" ADD CONSTRAINT "stock_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "stock_event_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_trades" ADD CONSTRAINT "stock_trades_corp_id_fkey" FOREIGN KEY ("corp_id") REFERENCES "corps"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

