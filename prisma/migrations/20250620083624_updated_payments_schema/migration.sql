-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "description" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "payerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
