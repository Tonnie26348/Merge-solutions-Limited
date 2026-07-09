import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateWalletDto, DepositFundsDto, TransferFundsDto } from '../dto/wallet.dto';

@Injectable()
export class WalletRepository {
  private prisma = new PrismaClient();

  async createWallet(data: CreateWalletDto) {
    return this.prisma.wallet.create({ data });
  }

  async findWalletByUserId(userId: string, type: string) {
    return this.prisma.wallet.findFirst({
      where: { userId, walletType: type },
    });
  }

  async findWalletById(id: string) {
    return this.prisma.wallet.findUnique({ where: { id } });
  }

  async updateBalance(walletId: string, amount: number) {
    return this.prisma.wallet.update({
      where: { id: walletId },
      data: { balance: { increment: amount } },
    });
  }

  async executeTransaction(senderId: string | null, recipientId: string | null, amount: number, type: string, reference: string, gateway: string, bookingId?: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Update Sender Balance
      if (senderId) {
        const sender = await tx.wallet.findUnique({ where: { id: senderId } });
        if (!sender || sender.balance.toNumber() < amount) {
          throw new Error('Insufficient funds in sender wallet');
        }
        await tx.wallet.update({
          where: { id: senderId },
          data: { balance: { decrement: amount } },
        });
      }

      // 2. Update Recipient Balance
      if (recipientId) {
        await tx.wallet.update({
          where: { id: recipientId },
          data: { balance: { increment: amount } },
        });
      }

      // 3. Record the Transaction
      return tx.transaction.create({
        data: {
          reference,
          amount,
          type: type as any,
          status: 'SUCCESSFUL',
          senderWalletId: senderId,
          recipientWalletId: recipientId,
          bookingId: bookingId,
          gateway: gateway as any,
          createdAt: new Date(),
        },
      });
    });
  }
}
