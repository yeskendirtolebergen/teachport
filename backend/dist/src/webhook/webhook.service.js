"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
let WebhookService = class WebhookService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async handleGoogleForm(data, isTest = false) {
        const existingUser = await this.prisma.user.findUnique({
            where: { iin: data.iin },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Teacher with this IIN already registered');
        }
        const tempPassword = crypto.randomBytes(6).toString('hex');
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(tempPassword, salt);
        const nameParts = data.fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        const certifications = [];
        if (data.tat2024)
            certifications.push({ type: 'TAT', year: 2024, value: data.tat2024 });
        if (data.tat2025)
            certifications.push({ type: 'TAT', year: 2025, value: data.tat2025 });
        if (data.tat2026)
            certifications.push({ type: 'TAT', year: 2026, value: data.tat2026 });
        if (data.ielts)
            certifications.push({ type: 'IELTS', value: data.ielts });
        if (data.toefl)
            certifications.push({ type: 'TOEFL', value: data.toefl });
        if (data.tesol)
            certifications.push({ type: 'TESOL', value: data.tesol });
        if (data.celta)
            certifications.push({ type: 'CELTA', value: data.celta });
        if (data.ib)
            certifications.push({ type: 'IB', value: data.ib });
        if (data.ap)
            certifications.push({ type: 'AP', value: data.ap });
        const studentResults = [];
        if (data.btsResults)
            studentResults.push({ type: 'BTS', value: data.btsResults });
        if (data.kboResults)
            studentResults.push({ type: 'KBO', value: data.kboResults });
        if (data.regionalResults)
            studentResults.push({ type: 'Regional Olympiad', value: data.regionalResults });
        if (data.labResults)
            studentResults.push({ type: 'Laboratory Work', value: data.labResults });
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
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map