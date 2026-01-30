"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const webhook_service_1 = require("./webhook.service");
const google_form_register_dto_1 = require("./dto/google-form-register.dto");
let WebhookController = class WebhookController {
    webhookService;
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async registerFromForm(data, secret, testMode) {
        const expectedSecret = process.env.WEBHOOK_SECRET || 'super-secret-key';
        if (secret !== expectedSecret) {
            throw new common_1.UnauthorizedException('Invalid webhook secret');
        }
        return this.webhookService.handleGoogleForm(data, testMode === 'true');
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)('google-form'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-webhook-secret')),
    __param(2, (0, common_1.Headers)('x-test-mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_form_register_dto_1.GoogleFormRegisterDto, String, String]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "registerFromForm", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map