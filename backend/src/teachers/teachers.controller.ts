import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) { }

    @Get('me')
    async getMyProfile(@Request() req) {
        return this.teachersService.getProfile(req.user.id);
    }

    @Patch('me')
    async updateMyProfile(@Request() req, @Body() data: any) {
        return this.teachersService.updateProfile(req.user.id, data);
    }
}
