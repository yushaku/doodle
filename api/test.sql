CREATE TABLE "company" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "name" varchar(255) NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);
