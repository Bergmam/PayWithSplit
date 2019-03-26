import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [PaymentsModule, SubscribersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
