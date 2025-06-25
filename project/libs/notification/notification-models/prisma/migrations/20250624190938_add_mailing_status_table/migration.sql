-- CreateTable
CREATE TABLE "mailing_statuses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_sent_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mailing_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mailing_statuses_user_id_key" ON "mailing_statuses"("user_id");
