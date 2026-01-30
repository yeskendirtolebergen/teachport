import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: number) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { userId },
            include: {
                certifications: true,
                studentResults: true,
                skills: {
                    include: { skill: true },
                },
                yearlyGoals: true,
            },
        });

        if (!teacher) {
            throw new NotFoundException('Teacher profile not found');
        }

        return teacher;
    }

    async updateProfile(userId: number, data: any) {
        // Prevent updating IIN/role through this endpoint
        const { iin, role, userId: uid, id, ...safeData } = data;

        return this.prisma.teacher.update({
            where: { userId },
            data: safeData,
        });
    }
}
