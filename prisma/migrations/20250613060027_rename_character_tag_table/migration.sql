/*
  Warnings:

  - You are about to drop the `CharacterFlag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CharacterFlag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CharacterTag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
