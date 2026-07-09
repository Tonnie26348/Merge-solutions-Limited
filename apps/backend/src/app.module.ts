import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ApartmentModule } from './modules/apartments/apartment.module';
import { ResidentModule } from './modules/residents/resident.module';
import { TechnicianModule } from './modules/technicians/technician.module';
import { CategoryModule } from './modules/categories/category.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { WalletModule } from './modules/wallets/wallet.module';
import { PaymentModule } from './modules/payments/payment.module';
import { VacancyModule } from './modules/vacancies/vacancy.module';
import { ReviewModule } from './modules/reviews/review.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    AuthModule, 
    ApartmentModule, 
    ResidentModule, 
    TechnicianModule, 
    CategoryModule, 
    MaintenanceModule, 
    ChatModule, 
    NotificationModule,
    WalletModule,
    PaymentModule,
    VacancyModule,
    ReviewModule,
    AnalyticsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
