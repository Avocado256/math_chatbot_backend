-- CreateEnum
CREATE TYPE "public"."MessageRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "public"."chat_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_message" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "role" "public"."MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "problem" TEXT,
    "solution" TEXT,
    "confidence" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."chat_message" ADD CONSTRAINT "chat_message_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."chat_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
