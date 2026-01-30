"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors();
    if (process.env.NODE_ENV === 'development') {
        await app.listen(process.env.PORT ?? 3001);
        console.log(`Backend running local on port 3001`);
    }
    else {
        await app.init();
        return app.getHttpAdapter().getInstance();
    }
}
if (process.env.NODE_ENV === 'development') {
    bootstrap();
}
let handler;
exports.default = async (req, res) => {
    if (!handler) {
        handler = await bootstrap();
    }
    return handler(req, res);
};
//# sourceMappingURL=main.js.map