-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'photo', 'link', 'quote');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'draft');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "status" "PostStatus" NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "user_id" TEXT NOT NULL,
    "is_repost" BOOLEAN NOT NULL,
    "repost_id" TEXT,
    "repost_user_id" TEXT,
    "comment_count" INTEGER,
    "like_count" INTEGER,
    "view_count" INTEGER,
    "repost_count" INTEGER,
    "video_title" TEXT,
    "video_url" TEXT,
    "text_title" TEXT,
    "text_announcement" TEXT,
    "text_description" TEXT,
    "quote_text" TEXT,
    "quote_author" TEXT,
    "photo_id" TEXT,
    "link_url" TEXT,
    "link_description" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
