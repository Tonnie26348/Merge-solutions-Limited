import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto, LoginDto, UserRole } from '@merge/shared-types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  async register(dto: RegisterUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
      throw new InternalServerErrorException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Find the role in DB
    const role = await this.prisma.role.findFirst({
      where: { name: dto.role },
    });

    if (!role) {
      throw new InternalServerErrorException(`Role ${dto.role} not found in system`);
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        roleId: role.id,
        status: 'PENDING', // All new users start as pending until verified
      },
    });

    return { id: user.id, email: user.email };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user || !user.passwordHash) {
      throw new InternalServerErrorException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new InternalServerErrorException('Invalid credentials');
    }

    // In production, this would return a JWT via Better Auth
    return {
      token: 'mock-jwt-token',
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
    };
  }

  async verifyUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isVerified: true, status: 'ACTIVE' },
    });
  }
}
