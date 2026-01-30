-- Database Schema for Teacher Academic Portfolio Platform

-- ENUMS
CREATE TYPE "Role" AS ENUM ('TEACHER', 'ADMIN');
CREATE TYPE "AchievementStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- USERS TABLE
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "iin" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" DEFAULT 'TEACHER',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TEACHERS TABLE
CREATE TABLE "Teacher" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP,
    "graduatedSchool" TEXT,
    "totalExperience" INTEGER DEFAULT 0,
    "currentWorkplace" TEXT,
    "experienceInCurrent" INTEGER DEFAULT 0,
    "subject" TEXT,
    "category" TEXT,
    "categoryExpiration" TIMESTAMP,
    "isHomeroomTeacher" BOOLEAN DEFAULT FALSE,
    "homeroomClass" TEXT,
    "degree" TEXT,
    "photoUrl" TEXT
);

-- CERTIFICATIONS TABLE
CREATE TABLE "Certification" (
    "id" SERIAL PRIMARY KEY,
    "teacherId" INTEGER NOT NULL REFERENCES "Teacher"("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL,
    "year" INTEGER,
    "value" TEXT NOT NULL,
    "status" "AchievementStatus" DEFAULT 'PENDING',
    "evidenceUrl" TEXT
);

-- STUDENT RESULTS TABLE
CREATE TABLE "StudentResult" (
    "id" SERIAL PRIMARY KEY,
    "teacherId" INTEGER NOT NULL REFERENCES "Teacher"("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "value" TEXT NOT NULL,
    "status" "AchievementStatus" DEFAULT 'PENDING'
);

-- SKILLS TABLE
CREATE TABLE "Skill" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "description" TEXT
);

-- TEACHER SKILLS TABLE (Relationship)
CREATE TABLE "TeacherSkill" (
    "id" SERIAL PRIMARY KEY,
    "teacherId" INTEGER NOT NULL REFERENCES "Teacher"("id") ON DELETE CASCADE,
    "skillId" INTEGER NOT NULL REFERENCES "Skill"("id") ON DELETE CASCADE,
    "status" "AchievementStatus" DEFAULT 'PENDING'
);

-- YEARLY GOALS TABLE
CREATE TABLE "YearlyGoal" (
    "id" SERIAL PRIMARY KEY,
    "teacherId" INTEGER NOT NULL REFERENCES "Teacher"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP,
    "status" "AchievementStatus" DEFAULT 'PENDING'
);

-- INDEXES
CREATE INDEX "idx_user_iin" ON "User"("iin");
CREATE INDEX "idx_teacher_email" ON "Teacher"("email");
CREATE INDEX "idx_certification_teacher" ON "Certification"("teacherId");
CREATE INDEX "idx_goal_status" ON "YearlyGoal"("status");
