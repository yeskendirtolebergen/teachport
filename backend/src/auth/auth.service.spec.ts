import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation((p) => Promise.resolve(`hashed_${p}`)),
  compare: jest.fn().mockImplementation((p, h) => Promise.resolve(h === `hashed_${p}`)),
  genSalt: jest.fn().mockResolvedValue('salt'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password hash if validation succeeds', async () => {
      const password = 'testPassword';
      const hash = 'hashed_testPassword';
      const user = { iin: '123456789012', passwordHash: hash, id: 1, role: 'TEACHER' };

      (prisma.user.findUnique as any).mockResolvedValue(user);

      const result = await service.validateUser(user.iin, password);
      expect(result).toBeDefined();
      expect(result.iin).toBe(user.iin);
      expect(result.passwordHash).toBeUndefined();
    });

    it('should return null if password does not match', async () => {
      const user = { iin: '123456789012', passwordHash: 'hashed_correctPass', id: 1, role: 'TEACHER' };
      (prisma.user.findUnique as any).mockResolvedValue(user);

      const result = await service.validateUser(user.iin, 'wrongPass');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token for valid credentials', async () => {
      const user = { iin: '123456789012', passwordHash: 'hash', id: 1, role: 'TEACHER' };
      jest.spyOn(service, 'validateUser').mockResolvedValue(user);

      const result = await service.login({ iin: user.iin, password: 'password' });
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('mockToken');
    });
  });
});
