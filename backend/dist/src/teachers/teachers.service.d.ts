import { PrismaService } from '../prisma/prisma.service';
export declare class TeachersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<{
        certifications: {
            id: number;
            year: number | null;
            teacherId: number;
            type: string;
            value: string;
            status: import("@prisma/client").$Enums.AchievementStatus;
            evidenceUrl: string | null;
        }[];
        studentResults: {
            id: number;
            teacherId: number;
            type: string;
            value: string;
            status: import("@prisma/client").$Enums.AchievementStatus;
            description: string | null;
        }[];
        skills: ({
            skill: {
                id: number;
                name: string;
                description: string | null;
            };
        } & {
            id: number;
            teacherId: number;
            status: import("@prisma/client").$Enums.AchievementStatus;
            skillId: number;
        })[];
        yearlyGoals: {
            id: number;
            teacherId: number;
            status: import("@prisma/client").$Enums.AchievementStatus;
            description: string | null;
            title: string;
            deadline: Date | null;
        }[];
    } & {
        id: number;
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        graduatedSchool: string | null;
        totalExperience: number;
        currentWorkplace: string | null;
        experienceInCurrent: number;
        subject: string | null;
        category: string | null;
        categoryExpiration: Date | null;
        isHomeroomTeacher: boolean;
        homeroomClass: string | null;
        degree: string | null;
        photoUrl: string | null;
    }>;
    updateProfile(userId: number, data: any): Promise<{
        id: number;
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        dateOfBirth: Date | null;
        graduatedSchool: string | null;
        totalExperience: number;
        currentWorkplace: string | null;
        experienceInCurrent: number;
        subject: string | null;
        category: string | null;
        categoryExpiration: Date | null;
        isHomeroomTeacher: boolean;
        homeroomClass: string | null;
        degree: string | null;
        photoUrl: string | null;
    }>;
}
