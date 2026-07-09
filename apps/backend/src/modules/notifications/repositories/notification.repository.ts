import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNotificationDto } from '../dto/notification.dto';

@Injectable()
export class NotificationRepository {
  private prisma = new PrismaClient();

  async createNotification(data: CreateNotificationDto) {
    return this.prisma.notification.create({ data });
  }

  async findUnreadNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }
}
