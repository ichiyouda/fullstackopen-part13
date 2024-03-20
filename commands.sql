CREATE TABLE IF NOT EXISTS "blogs" 
(
    "id" SERIAL,
    "author" TEXT,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "likes" INTEGER DEFAULT 0,
    PRIMARY KEY ("id")
);
