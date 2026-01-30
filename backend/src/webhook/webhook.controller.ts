import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GoogleFormRegisterDto } from './dto/google-form-register.dto';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) { }

    @Post('google-form')
    async registerFromForm(
        @Body() data: GoogleFormRegisterDto,
        @Headers('x-webhook-secret') secret: string,
    ) {
        const expectedSecret = process.env.WEBHOOK_SECRET || 'super-secret-key';

        if (secret !== expectedSecret) {
            throw new UnauthorizedException('Invalid webhook secret');
        }

        return this.webhookService.handleGoogleForm(data);
    }
}
