-- CreateTable
CREATE TABLE "blog_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publications_count" INTEGER NOT NULL,
    "subscribers_count" INTEGER NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "blog_users_pkey" PRIMARY KEY ("id")
);
