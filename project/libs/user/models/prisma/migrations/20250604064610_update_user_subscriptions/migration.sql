/*
  Warnings:

  - You are about to drop the `blog_user_subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "blog_user_subscriptions" DROP CONSTRAINT "blog_user_subscriptions_followedUserId_fkey";

-- DropForeignKey
ALTER TABLE "blog_user_subscriptions" DROP CONSTRAINT "blog_user_subscriptions_followerUserId_fkey";

-- DropTable
DROP TABLE "blog_user_subscriptions";

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" TEXT NOT NULL,
    "followerUserId" TEXT NOT NULL,
    "followedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_followerUserId_followedUserId_key" ON "user_subscriptions"("followerUserId", "followedUserId");

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "blog_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "blog_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
