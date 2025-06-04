-- CreateTable
CREATE TABLE "blog_user_subscriptions" (
    "id" TEXT NOT NULL,
    "followerUserId" TEXT NOT NULL,
    "followedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_user_subscriptions_followerUserId_followedUserId_key" ON "blog_user_subscriptions"("followerUserId", "followedUserId");

-- AddForeignKey
ALTER TABLE "blog_user_subscriptions" ADD CONSTRAINT "blog_user_subscriptions_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "blog_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_user_subscriptions" ADD CONSTRAINT "blog_user_subscriptions_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "blog_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
