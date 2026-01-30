import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AchievementStatus, Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('teachers')
    async listTeachers() {
        return this.adminService.getAllTeachers();
    }

    @Get('teachers/:id')
    async getTeacher(@Param('id') id: string) {
        return this.adminService.getTeacherDetail(+id);
    }

    @Patch('certifications/:id/status')
    async moderateCert(@Param('id') id: string, @Body('status') status: AchievementStatus) {
        return this.adminService.approveCertification(+id, status);
    }

    @Patch('student-results/:id/status')
    async moderateResult(@Param('id') id: string, @Body('status') status: AchievementStatus) {
        return this.adminService.approveStudentResult(+id, status);
    }

    @Patch('skills/:id/status')
    async moderateSkill(@Param('id') id: string, @Body('status') status: AchievementStatus) {
        return this.adminService.approveSkill(+id, status);
    }

    @Patch('goals/:id/status')
    async moderateGoal(@Param('id') id: string, @Body('status') status: AchievementStatus) {
        return this.adminService.approveGoal(+id, status);
    }
}
