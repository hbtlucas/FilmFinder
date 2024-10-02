/*
  Warnings:

  - Added the required column `generostr` to the `Filmes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filmes" ADD COLUMN     "generostr" TEXT NOT NULL;
