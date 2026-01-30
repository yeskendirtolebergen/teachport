import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AchievementStatus } from '@prisma/client';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getAllTeachers() {
        return this.prisma.teacher.findMany({
            include: {
                user: { select: { iin: true, role: true } },
            },
        });
    }

    async getTeacherDetail(id: number) {
        return this.prisma.teacher.findUnique({
            where: { id },
            include: {
                certifications: true,
                studentResults: true,
                skills: { include: { skill: true } },
                yearlyGoals: true,
            },
        });
    }

    async approveCertification(id: number, status: AchievementStatus) {
        return this.prisma.certification.update({ where: { id }, data: { status } });
    }

    async approveStudentResult(id: number, status: AchievementStatus) {
        return this.prisma.studentResult.update({ where: { id }, data: { status } });
    }

    async approveSkill(id: number, status: AchievementStatus) {
        return this.prisma.teacherSkill.update({ where: { id }, data: { status } });
    }

    async approveGoal(id: number, status: AchievementStatus) {
        return this.prisma.yearlyGoal.update({ where: { id }, data: { status } });
    }
}
