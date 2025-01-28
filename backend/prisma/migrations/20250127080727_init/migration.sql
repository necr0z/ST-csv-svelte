-- CreateTable
CREATE TABLE "csvData" (
    "csvId" INTEGER NOT NULL,
    "postId" INTEGER,
    "name" TEXT,
    "email" TEXT,
    "body" TEXT,

    CONSTRAINT "csvData_pkey" PRIMARY KEY ("csvId")
);
