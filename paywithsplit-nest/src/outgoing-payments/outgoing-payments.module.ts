import { Module } from '@nestjs/common';
import { OutgoingPaymentsController } from './outgoing-payments.controller';
import { OutgoingPaymentsService } from './outgoing-payments.service';

@Module({
  controllers: [OutgoingPaymentsController],
  providers: [OutgoingPaymentsService]
})
export class OutgoingPaymentsModule {}
