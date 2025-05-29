-- CreateTable
CREATE TABLE "Cutscene" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CutsceneCharacter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "cutsceneId" INTEGER NOT NULL,
    CONSTRAINT "CutsceneCharacter_cutsceneId_fkey" FOREIGN KEY ("cutsceneId") REFERENCES "Cutscene" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
