/*
  Warnings:

  - You are about to alter the column `market_cap_end` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `market_cap_open` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `market_cap_high` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `market_cap_low` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `market_cap_avg` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `market_cap_prev` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `ev_end` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `ev_end_avg` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.
  - You are about to alter the column `ev_prev` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Decimal(20,4)`.

*/
-- AlterTable
ALTER TABLE "indicators" ALTER COLUMN "market_cap_end" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "market_cap_open" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "market_cap_high" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "market_cap_low" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "market_cap_avg" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "market_cap_prev" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "ev_end" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "ev_end_avg" SET DATA TYPE DECIMAL(20,4),
ALTER COLUMN "ev_prev" SET DATA TYPE DECIMAL(20,4);
