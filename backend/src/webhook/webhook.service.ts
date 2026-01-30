import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { GoogleFormRegisterDto } from './dto/google-form-register.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class WebhookService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) { }

    async handleGoogleForm(data: GoogleFormRegisterDto, isTest: boolean = false) {
        const existingUser = await this.prisma.user.findUnique({
            where: { iin: data.iin },
        });

        if (existingUser) {
            throw new ConflictException('Teacher with this IIN already registered');
        }

        const tempPassword = crypto.randomBytes(6).toString('hex');
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(tempPassword, salt);

        const nameParts = data.fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Prepare achievements
        const certifications: any[] = [];
        if (data.tat2024) certifications.push({ type: 'TAT', year: 2024, value: data.tat2024 });
        if (data.tat2025) certifications.push({ type: 'TAT', year: 2025, value: data.tat2025 });
        if (data.tat2026) certifications.push({ type: 'TAT', year: 2026, value: data.tat2026 });
        if (data.ielts) certifications.push({ type: 'IELTS', value: data.ielts });
        if (data.toefl) certifications.push({ type: 'TOEFL', value: data.toefl });
        if (data.tesol) certifications.push({ type: 'TESOL', value: data.tesol });
        if (data.celta) certifications.push({ type: 'CELTA', value: data.celta });
        if (data.ib) certifications.push({ type: 'IB', value: data.ib });
        if (data.ap) certifications.push({ type: 'AP', value: data.ap });

        const studentResults: any[] = [];
        if (data.btsResults) studentResults.push({ type: 'BTS', value: data.btsResults });
        if (data.kboResults) studentResults.push({ type: 'KBO', value: data.kboResults });
        if (data.regionalResults) studentResults.push({ type: 'Regional Olympiad', value: data.regionalResults });
        if (data.labResults) studentResults.push({ type: 'Laboratory Work', value: data.labResults });

        const user = await this.prisma.user.create({
            data: {
                iin: data.iin,
                passwordHash: passwordHash,
                role: 'TEACHER',
                teacher: {
                    create: {
                        firstName,
                        lastName,
                        email: data.email,
                        phone: data.phone,
                        dateOfBirth: data.birthDate ? new Date(data.birthDate) : null,
                        graduatedSchool: data.graduatedSchool,
                        totalExperience: Number(data.totalExperience) || 0,
                        currentWorkplace: data.currentWorkplace,
                        experienceInCurrent: Number(data.experienceInCurrent) || 0,
                        subject: data.subject,
                        category: data.category,
                        categoryExpiration: data.categoryExpiration ? new Date(data.categoryExpiration) : null,
                        isHomeroomTeacher: data.isHomeroomTeacher === 'Иа' || data.isHomeroomTeacher === 'true' || data.isHomeroomTeacher === true,
                        homeroomClass: data.homeroomClass,
                        degree: data.academicBackground,
                        certifications: {
                            create: certifications,
                        },
                        studentResults: {
                            create: studentResults,
                        },
                    },
                },
            },
        });

        await this.mailService.sendCredentials(data.email, data.iin, tempPassword);

        return {
            message: 'Teacher account created successfully',
            iin: user.iin,
            ...(isTest ? { tempPassword } : {}),
        };
    }
}
