-- CreateTable
CREATE TABLE "hospital" (
    "id_organization" TEXT NOT NULL,
    "id_location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telecom" TEXT NOT NULL,
    "address_line" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "practitioner" (
    "identifier" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "id_organization" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "patient" (
    "identifier" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "telecom" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "visit" (
    "identifier" TEXT NOT NULL,
    "id_organization" TEXT NOT NULL,
    "id_practitioner" TEXT NOT NULL,
    "id_patient" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "hospital_stats" (
    "hospital_id" TEXT NOT NULL,
    "visit_count" BIGINT NOT NULL,
    "patient_count" BIGINT NOT NULL,
    "most_common_disease" TEXT NOT NULL,
    "disease_count" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "practitioner_stats" (
    "id_practitioner" TEXT NOT NULL,
    "average_age" DOUBLE PRECISION NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "total_patients" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "hospital_id_organization_key" ON "hospital"("id_organization");

-- CreateIndex
CREATE UNIQUE INDEX "practitioner_identifier_key" ON "practitioner"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "patient_identifier_key" ON "patient"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "visit_identifier_key" ON "visit"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_stats_hospital_id_key" ON "hospital_stats"("hospital_id");

-- CreateIndex
CREATE UNIQUE INDEX "practitioner_stats_id_practitioner_key" ON "practitioner_stats"("id_practitioner");
