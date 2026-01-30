import { WebhookService } from './webhook.service';
import { GoogleFormRegisterDto } from './dto/google-form-register.dto';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    registerFromForm(data: GoogleFormRegisterDto, secret: string, testMode: string): Promise<{
        tempPassword?: string | undefined;
        message: string;
        iin: string;
    }>;
}
