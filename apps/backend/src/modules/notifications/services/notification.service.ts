import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { CreateNotificationDto } from '../dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  async sendNotification(dto: CreateNotificationDto) {
    const notification = await this.repository.createNotification(dto);
    
    // Integration Point: Trigger Firebase Cloud Messaging (FCM) here
    // console.log(`Sending Push Notification to ${dto.userId}: ${dto.title}`);
    
    return notification;
  }

  async getUnread(userId: string) {
    return this.repository.findUnreadNotifications(userId);
  }

  async markAsRead(id: string) {
    return this.repository.markAsRead(id);
  }

  async markAllRead(userId: string) {
    return this.repository.markAllAsRead(userId);
  }
}
