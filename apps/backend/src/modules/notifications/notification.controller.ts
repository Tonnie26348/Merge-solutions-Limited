import { Controller, Get, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('unread')
  async getUnread(@Req() req) {
    return this.notificationService.getUnread(req.user.id);
  }

  @Put('read/:id')
  async markRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Put('read-all')
  async markAllRead(@Req() req) {
    return this.notificationService.markAllRead(req.user.id);
  }
}
