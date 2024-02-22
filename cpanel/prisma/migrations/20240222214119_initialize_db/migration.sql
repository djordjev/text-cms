-- CreateTable
CREATE TABLE "FsNode" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    "path" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "FsNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FsNode" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FsNode_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FsNodeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FsNodeType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FsNode_path_key" ON "FsNode"("path");

-- CreateIndex
CREATE UNIQUE INDEX "FsNodeType_name_key" ON "FsNodeType"("name");
