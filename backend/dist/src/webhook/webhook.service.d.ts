import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { GoogleFormRegisterDto } from './dto/google-form-register.dto';
export declare class WebhookService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    handleGoogleForm(data: GoogleFormRegisterDto, isTest?: boolean): Promise<{
        tempPassword?: string | undefined;
        message: string;
        iin: string;
    }>;
}
