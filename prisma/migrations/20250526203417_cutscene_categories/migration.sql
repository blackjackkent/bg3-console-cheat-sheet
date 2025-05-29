-- CreateTable
CREATE TABLE "CutsceneCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cutscene" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Cutscene_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CutsceneCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cutscene" ("categoryId", "description", "id", "name", "uuid") SELECT "categoryId", "description", "id", "name", "uuid" FROM "Cutscene";
DROP TABLE "Cutscene";
ALTER TABLE "new_Cutscene" RENAME TO "Cutscene";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
