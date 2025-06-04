/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `blog_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blog_users_email_key" ON "blog_users"("email");
