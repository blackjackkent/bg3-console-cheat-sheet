/*
  Warnings:

  - Added the required column `index` to the `CutsceneCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CutsceneCharacter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cutsceneId" INTEGER NOT NULL,
    CONSTRAINT "CutsceneCharacter_cutsceneId_fkey" FOREIGN KEY ("cutsceneId") REFERENCES "Cutscene" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CutsceneCharacter" ("cutsceneId", "description", "id") SELECT "cutsceneId", "description", "id" FROM "CutsceneCharacter";
DROP TABLE "CutsceneCharacter";
ALTER TABLE "new_CutsceneCharacter" RENAME TO "CutsceneCharacter";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
