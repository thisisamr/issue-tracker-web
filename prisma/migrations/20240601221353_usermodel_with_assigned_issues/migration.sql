-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignedto" TEXT;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedto_fkey" FOREIGN KEY ("assignedto") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
