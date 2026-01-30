import { AdminService } from './admin.service';
import { AchievementStatus } from '@prisma/client';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listTeachers(): Promise<({
        user: {
            iin: string;
            role: import("@prisma/client").$Enums.Role;
        };
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
    })[]>;
    getTeacher(id: string): Promise<({
        certifications: {
            id: number;
            year: number | null;
            type: string;
            value: string;
            status: import("@prisma/client").$Enums.AchievementStatus;
            evidenceUrl: string | null;
            teacherId: number;
        }[];
        studentResults: {
            id: number;
            type: string;
            value: string;
            status: import("@prisma/client").$Enums.AchievementStatus;
            description: string | null;
            teacherId: number;
        }[];
        skills: ({
            skill: {
                id: number;
                name: string;
                description: string | null;
            };
        } & {
            id: number;
            status: import("@prisma/client").$Enums.AchievementStatus;
            teacherId: number;
            skillId: number;
        })[];
        yearlyGoals: {
            id: number;
            status: import("@prisma/client").$Enums.AchievementStatus;
            description: string | null;
            teacherId: number;
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
    }) | null>;
    moderateCert(id: string, status: AchievementStatus): Promise<{
        id: number;
        year: number | null;
        type: string;
        value: string;
        status: import("@prisma/client").$Enums.AchievementStatus;
        evidenceUrl: string | null;
        teacherId: number;
    }>;
    moderateResult(id: string, status: AchievementStatus): Promise<{
        id: number;
        type: string;
        value: string;
        status: import("@prisma/client").$Enums.AchievementStatus;
        description: string | null;
        teacherId: number;
    }>;
    moderateSkill(id: string, status: AchievementStatus): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.AchievementStatus;
        teacherId: number;
        skillId: number;
    }>;
    moderateGoal(id: string, status: AchievementStatus): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.AchievementStatus;
        description: string | null;
        teacherId: number;
        title: string;
        deadline: Date | null;
    }>;
}
