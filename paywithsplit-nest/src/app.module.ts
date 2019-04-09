import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { OutgoingPaymentsModule } from './outgoing-payments/outgoing-payments.module';

@Module({
  imports: [PaymentsModule, SubscribersModule, OutgoingPaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
