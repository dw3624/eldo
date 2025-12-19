/*
  Warnings:

  - Made the column `report_id` on table `statements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "idx_corps_emsec_corp";

-- DropIndex
DROP INDEX "idx_corps_historys_corp";

-- DropIndex
DROP INDEX "idx_trades_corp";

-- DropIndex
DROP INDEX "idx_trades_corp_date";

-- DropIndex
DROP INDEX "idx_trades_date";

-- AlterTable
ALTER TABLE "statements" ALTER COLUMN "report_id" SET NOT NULL;
