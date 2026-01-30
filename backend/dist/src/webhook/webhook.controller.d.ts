import { WebhookService } from './webhook.service';
import { GoogleFormRegisterDto } from './dto/google-form-register.dto';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    registerFromForm(data: GoogleFormRegisterDto, secret: string): Promise<{
        message: string;
        iin: string;
    }>;
}
