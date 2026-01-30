import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from './webhook.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ConflictException } from '@nestjs/common';

describe('WebhookService', () => {
  let service: WebhookService;
  let prisma: PrismaService;
  let mailService: MailService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockMailService = {
    sendCredentials: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    prisma = module.get<PrismaService>(PrismaService);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleGoogleForm', () => {
    const mockDto = {
      fullName: 'John Doe',
      iin: '123456789012',
      email: 'john@example.com',
      phone: '123456789',
    };

    it('should throw ConflictException if teacher already exists', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 1 });

      await expect(service.handleGoogleForm(mockDto as any)).rejects.toThrow(ConflictException);
    });

    it('should create a new user and send email', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({ iin: mockDto.iin, id: 1 });

      const result = await service.handleGoogleForm(mockDto as any);

      expect(prisma.user.create).toHaveBeenCalled();
      expect(mailService.sendCredentials).toHaveBeenCalledWith(
        mockDto.email,
        mockDto.iin,
        expect.any(String)
      );
      expect(result.message).toContain('successfully');
    });
  });
});
