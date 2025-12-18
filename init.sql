\c eldo;
-- ==================== ENUMS ====================

CREATE TYPE stock_exchange_types AS ENUM ('krx', 'kosdaq', 'kospi', 'nye', 'nasdaq');

CREATE TYPE status_listing_types AS ENUM ('ac', 'su', 'de');

CREATE TYPE corps_sizes AS ENUM ('le', 'me', 'sm', 'vs');

CREATE TYPE history_types AS ENUM ('corp', 'ceo');

CREATE TYPE event_codes AS ENUM ('div', 'bon', 'rig', 'spl', 'rev', 'red', 'mer', 'spi', 'exd', 'sus', 'del', 'new');


-- ==================== MASTER TABLES ====================

-- 산업분류 (EMSEC)
CREATE TABLE emsec (
    id SERIAL PRIMARY KEY,
    sector VARCHAR(100),
    sector_en VARCHAR(100),
    industry VARCHAR(100),
    industry_en VARCHAR(100),
    sub_industry VARCHAR(100),
    sub_industry_en VARCHAR(100),
    code VARCHAR(20),
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 이벤트 타입
CREATE TABLE stock_event_types (
    id SERIAL PRIMARY KEY,
    code event_codes NOT NULL UNIQUE,
    name VARCHAR(100),
    code_name VARCHAR(100),
    adj_required BOOLEAN DEFAULT FALSE,
    caption TEXT
);


-- ==================== MAIN TABLES ====================

-- 기업 정보
CREATE TABLE corps (
    id UUID PRIMARY KEY,
    stock_exchange stock_exchange_types,
    corp_ticker VARCHAR(20),
    corp_name_listed VARCHAR(200),
    corp_name_local VARCHAR(200),
    corp_name_en VARCHAR(200),
    country_code VARCHAR(3),
    region_large VARCHAR(50),
    region_detail VARCHAR(100),
    corp_id VARCHAR(50),  -- 법인등록번호
    biz_id VARCHAR(50),   -- 사업자등록번호
    date_founded DATE,
    date_listed DATE,
    status_listing status_listing_types DEFAULT 'ac',
    date_suspended TIMESTAMP,
    date_resumption TIMESTAMP,
    cnt_suspended INTEGER DEFAULT 0,
    status_date TIMESTAMP,
    corp_size corps_sizes,
    group_name VARCHAR(200),
    major_holder VARCHAR(200),
    ceo_name VARCHAR(100),
    addr_local TEXT,
    addr_en TEXT,
    homepage VARCHAR(500),
    email_addr VARCHAR(200),
    tel_no VARCHAR(50),
    fax_no VARCHAR(50),
    industry_code VARCHAR(20),
    settle_period VARCHAR(20),
    biz_overview TEXT,
    sales_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_corp_ticker UNIQUE (stock_exchange, corp_ticker)
);

-- 기업 변경 이력
CREATE TABLE corps_historys (
    id SERIAL PRIMARY KEY,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,
    type history_types NOT NULL,
    order_seq INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL,
    change_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_corp_history UNIQUE (corp_id, type, order_seq)
);

-- 기업-산업분류 연결
CREATE TABLE corps_emsec (
    id SERIAL PRIMARY KEY,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,
    emsec_id INTEGER NOT NULL REFERENCES emsec(id) ON DELETE CASCADE,
    ratio NUMERIC(10, 4),
    rank INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_corp_emsec UNIQUE (corp_id, emsec_id, rank)
);



-- ==================== FINANCIAL TABLES ====================

-- 재무 보고서
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    recept_no VARCHAR(100),
    flr_nm VARCHAR(100),
    recept_date DATE NOT NULL,
    rm VARCHAR(50),
    fiscal_no INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_report UNIQUE (corp_id, recept_no, name)
);

-- 재무제표
CREATE TABLE statements (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,
    currency VARCHAR(20),
    period_start DATE,
    period_end DATE,

    -- 재무상태
    assets_ttl NUMERIC(20,2),
    assets_current NUMERIC(20,2),
    cash_ttl NUMERIC(20,2),
    ar_ttl NUMERIC(20,2),
    inventory_ttl NUMERIC(20,2),
    assets_tangible_ttl NUMERIC(20,2),
    assets_intangible_ttl NUMERIC(20,2),
    liabilities_ttl NUMERIC(20,2),
    liabilities_current NUMERIC(20,2),
    accounts_payable_ttl NUMERIC(20,2),
    debt_interest_ttl NUMERIC(20,2),
    equity_ttl NUMERIC(20,2),
    equity_common NUMERIC(20,2),
    capital_paid_in NUMERIC(20,2),
    capital_preferred NUMERIC(20,2),
    capital_common NUMERIC(20,2),
    rtd_earnings_ttl NUMERIC(20,2),
    capital_surplus_ttl NUMERIC(20,2),
    surplus_ttl NUMERIC(20,2),
    net_borrowing NUMERIC(20,2),
    nwc NUMERIC(20,2),

    -- 현금흐름
    cfo_ttl NUMERIC(20,2),
    depreciation_ttl NUMERIC(20,2),
    cfi_ttl NUMERIC(20,2),
    capex NUMERIC(20,2),
    cff_ttl NUMERIC(20,2),
    dividends_ttl NUMERIC(20,2),

    -- 손익계산
    revenue NUMERIC(20,2),
    cogs NUMERIC(20,2),
    sga_ttl NUMERIC(20,2),
    operating_profit NUMERIC(20,2),
    tax_expense NUMERIC(20,2),
    net_income NUMERIC(20,2),
    net_income_ctrl NUMERIC(20,2),
    ebitda NUMERIC(20,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_statement UNIQUE (corp_id, report_id, period_end, period_start)
);

-- 재무 지표
-- ==================== FINANCIAL INDICATORS ====================

CREATE TABLE indicators (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    statement_id  INTEGER NOT NULL REFERENCES statements(id) ON DELETE CASCADE,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,

    -- 시총 / EV
    market_cap_end              NUMERIC(20, 2),
    market_cap_open             NUMERIC(20, 2),
    market_cap_high             NUMERIC(20, 2),
    market_cap_low              NUMERIC(20, 2),
    market_cap_avg              NUMERIC(20, 2),
    market_cap_prev             NUMERIC(20, 2),

    ev_end                      NUMERIC(20, 2),
    ev_end_avg                  NUMERIC(20, 2),
    ev_prev                     NUMERIC(20, 2),

    -- Per Share
    sps                         NUMERIC(20, 4),      -- Sales Per Share
    ebitdaps                    NUMERIC(20, 4),
    eps                         NUMERIC(20, 4),
    cfps                        NUMERIC(20, 4),
    bps                         NUMERIC(20, 4),

    -- Multiple (PSR, PER, PCR, EV/…, PBR)
    psr_end                     NUMERIC(20, 4),
    psr_avg                     NUMERIC(20, 4),
    psr_prev                    NUMERIC(20, 4),

    per_end                     NUMERIC(20, 4),
    per_avg                     NUMERIC(20, 4),
    per_prev                    NUMERIC(20, 4),

    pcr_end                     NUMERIC(20, 4),
    pcr_avg                     NUMERIC(20, 4),
    pcr_prev                    NUMERIC(20, 4),

    ev_sales_end                NUMERIC(20, 4),
    ev_sales_avg                NUMERIC(20, 4),
    ev_sales_prev               NUMERIC(20, 4),

    ev_ebitda_end               NUMERIC(20, 4),
    ev_ebitda_avg               NUMERIC(20, 4),
    ev_ebitda_prev              NUMERIC(20, 4),

    pbr_end                     NUMERIC(20, 4),
    pbr_avg                     NUMERIC(20, 4),
    pbr_prev                    NUMERIC(20, 4),

    -- 수익성 (Profitability)
    gpm                         NUMERIC(10, 4),      -- Gross Profit Margin
    opm                         NUMERIC(10, 4),      -- Operating Profit Margin
    npm                         NUMERIC(10, 4),      -- Net Profit Margin
    ebitda_margin               NUMERIC(10, 4),

    roe                         NUMERIC(10, 4),
    roa                         NUMERIC(10, 4),
    roic                        NUMERIC(10, 4),
    wacc                        NUMERIC(10, 4),

    -- 성장성 (Growth)
    revenue_growth_rate         NUMERIC(10, 4),
    operating_profit_growth_rate NUMERIC(10, 4),
    ebitda_growth_rate          NUMERIC(10, 4),
    net_income_growth_rate      NUMERIC(10, 4),
    cfo_growth_rate             NUMERIC(10, 4),
    equity_growth_rate          NUMERIC(10, 4),

    -- 비율 증가율 (Margin Growth)
    operating_margin_growth_rate NUMERIC(10, 4),
    ebitda_margin_growth_rate   NUMERIC(10, 4),
    net_margin_growth_rate      NUMERIC(10, 4),

    -- 증감 상태 (Status)
    revenue_status              VARCHAR(10),
    operating_profit_status     VARCHAR(10),
    ebitda_status               VARCHAR(10),
    net_income_status           VARCHAR(10),

    -- 증감 패턴 3년 (Pattern 3Y)
    revenue_pattern_3y          VARCHAR(10),
    operating_profit_pattern_3y VARCHAR(10),
    ebitda_pattern_3y           VARCHAR(10),
    net_income_pattern_3y       VARCHAR(10),

    -- CAGR 3년
    revenue_cagr_3y             NUMERIC(10, 4),
    operating_profit_cagr_3y    NUMERIC(10, 4),
    operating_margin_cagr_3y    NUMERIC(10, 4),
    ebitda_cagr_3y              NUMERIC(10, 4),
    ebitda_margin_cagr_3y       NUMERIC(10, 4),
    net_income_cagr_3y          NUMERIC(10, 4),
    net_margin_cagr_3y          NUMERIC(10, 4),
    cfo_cagr_3y                 NUMERIC(10, 4),
    equity_cagr_3y              NUMERIC(10, 4),

    -- CAGR 5년
    revenue_cagr_5y             NUMERIC(10, 4),
    operating_profit_cagr_5y    NUMERIC(10, 4),
    operating_margin_cagr_5y    NUMERIC(10, 4),
    ebitda_cagr_5y              NUMERIC(10, 4),
    ebitda_margin_cagr_5y       NUMERIC(10, 4),
    net_income_cagr_5y          NUMERIC(10, 4),
    net_margin_cagr_5y          NUMERIC(10, 4),
    cfo_cagr_5y                 NUMERIC(10, 4),
    equity_cagr_5y              NUMERIC(10, 4),

    -- 안정성 (Stability)
    debt_to_equity_ratio        NUMERIC(10, 4),
    equity_ratio                NUMERIC(10, 4),
    net_debt_ratio              NUMERIC(10, 4),
    current_ratio               NUMERIC(10, 4),
    current_liabilities_ratio   NUMERIC(10, 4),
    capital_retention_ratio     NUMERIC(10, 4),
    interest_coverage_ratio     NUMERIC(10, 4),

    -- 안정성 비율 증가율 / CAGR
    debt_to_equity_ratio_growth_rate NUMERIC(10, 4),
    equity_ratio_growth_rate    NUMERIC(10, 4),
    net_debt_ratio_growth_rate  NUMERIC(10, 4),

    debt_to_equity_ratio_cagr_3y NUMERIC(10, 4),
    equity_ratio_cagr_3y        NUMERIC(10, 4),
    net_debt_ratio_cagr_3y      NUMERIC(10, 4),

    debt_to_equity_ratio_cagr_5y NUMERIC(10, 4),
    equity_ratio_cagr_5y        NUMERIC(10, 4),
    net_debt_ratio_cagr_5y      NUMERIC(10, 4),

    -- 활동성 (Activity)
    ttl_asset_turnover          NUMERIC(10, 4),
    ttl_liability_turnover      NUMERIC(10, 4),
    equity_turnover             NUMERIC(10, 4),
    fixed_asset_turnover        NUMERIC(10, 4),
    ar_turnover                 NUMERIC(10, 4),
    inventory_turnover          NUMERIC(10, 4),
    ap_turnover                 NUMERIC(10, 4),

    -- 환원성 (Shareholder return)
    dividend_payout_ratio       NUMERIC(10, 4),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_indicator UNIQUE (report_id, statement_id)
);



-- ==================== STOCK TABLES ====================

-- 주가 거래 데이터
CREATE TABLE stock_trades (
    id SERIAL PRIMARY KEY,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,
    trade_date DATE NOT NULL,
    currency VARCHAR(3) DEFAULT 'KRW',

    -- 거래 정보
    floating_shares BIGINT,
    shares_listed BIGINT,
    trade_volume BIGINT,
    trade_value NUMERIC(15, 2),

    -- 가격 정보 (원본)
    price_close_raw NUMERIC(15, 2),
    price_open_raw NUMERIC(15, 2),
    price_high_raw NUMERIC(15, 2),
    price_low_raw NUMERIC(15, 2),
    market_cap_raw NUMERIC(20, 2),

    fluc_tp_cd NUMERIC(20,2),
    change NUMERIC(20,2),
    fluc_rt NUMERIC(20,2),

    -- 가격 정보 (조정)
    price_close_adj NUMERIC(15, 2),
    price_open_adj NUMERIC(15, 2),
    price_high_adj NUMERIC(15, 2),
    price_low_adj NUMERIC(15, 2),
    market_cap_adj NUMERIC(20, 2),

    -- 기업가치
    net_debt NUMERIC(20, 2),
    ev NUMERIC(20, 2),
    enterprise_value NUMERIC(20, 2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_stock_trade UNIQUE (corp_id, trade_date),
    CONSTRAINT chk_enterprise_value CHECK (
        enterprise_value IS NULL OR 
        market_cap_adj IS NULL OR 
        net_debt IS NULL OR
        ABS(market_cap_adj + net_debt - enterprise_value) < 0.01
    )
);

-- 주식 이벤트
CREATE TABLE stock_events (
    id SERIAL PRIMARY KEY,
    corp_id UUID NOT NULL REFERENCES corps(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    event_id INTEGER NOT NULL REFERENCES stock_event_types(id),
    event_detail TEXT,
    adj_required BOOLEAN DEFAULT FALSE,

    -- 권리락 정보
    price_close_ex_right NUMERIC(15, 2),
    price_base_ex_right NUMERIC(15, 2),
    cash_dividend NUMERIC(15, 2),
    adj_factor NUMERIC(10, 6),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_stock_event UNIQUE (corp_id, event_date, event_id)
);


-- ==================== INDEXES ====================

-- corps 테이블 인덱스
CREATE INDEX idx_corps_ticker ON corps(corp_ticker);
CREATE INDEX idx_corps_name ON corps(corp_name_local);
CREATE INDEX idx_corps_exchange ON corps(stock_exchange);
CREATE INDEX idx_corps_status ON corps(status_listing);

-- reports 테이블 인덱스
CREATE INDEX idx_reports_corp ON reports(corp_id);
CREATE INDEX idx_reports_date ON reports(recept_date);
CREATE INDEX idx_reports_corp_date ON reports(corp_id, recept_date DESC);

-- statements 테이블 인덱스
CREATE INDEX idx_statements_report ON statements(report_id);
CREATE INDEX idx_statements_corp ON statements(corp_id);

-- stock_trades 테이블 인덱스
CREATE INDEX idx_trades_corp ON stock_trades(corp_id);
CREATE INDEX idx_trades_date ON stock_trades(trade_date);
CREATE INDEX idx_trades_corp_date ON stock_trades(corp_id, trade_date DESC);

-- 복합 인덱스 (조회 성능 최적화)
CREATE INDEX idx_corps_historys_corp ON corps_historys(corp_id, type, order_seq);
CREATE INDEX idx_corps_emsec_corp ON corps_emsec(corp_id, emsec_id);


-- ==================== TRIGGERS ====================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- corps 테이블에 트리거 적용
CREATE TRIGGER update_corps_updated_at
    BEFORE UPDATE ON corps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==================== COMMENTS ====================

COMMENT ON TABLE corps IS '기업 기본 정보';
COMMENT ON TABLE corps_historys IS '기업명/대표자 변경 이력';
COMMENT ON TABLE reports IS '재무 보고서 메타데이터';
COMMENT ON TABLE statements IS '재무제표 상세 항목';
COMMENT ON TABLE indicators IS '재무 지표 (계산된 값)';
COMMENT ON TABLE stock_trades IS '일별 주가 거래 데이터';
COMMENT ON TABLE stock_events IS '주식 이벤트 (배당, 분할 등)';

COMMENT ON COLUMN corps.status_listing IS 'ac: active, su: suspended, de: delisted';
COMMENT ON COLUMN stock_trades.enterprise_value IS '기업가치 = 시가총액 + 순부채';