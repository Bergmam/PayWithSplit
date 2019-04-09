import { Controller, Get, Param, Post, Body, Delete, Query, Logger, ValidationPipe } from '@nestjs/common';
import { OutgoingPaymentsService } from './outgoing-payments.service';
import { CreatePaymentDTO } from 'src/payments/dto/create-payment.dto';

@Controller('outgoing-payments')
export class OutgoingPaymentsController {
    constructor(private outgoingPaymentsService: OutgoingPaymentsService) {}

    private readonly logger = new Logger(OutgoingPaymentsController.name);

    @Get()
    async getAllPayments() {
        const payments = await this.outgoingPaymentsService.getAllPayments();
        return payments;
    }

    @Post()
    async addPayment(@Body() data : CreatePaymentDTO){
        let stringdata = JSON.stringify(data, null, 2);
        this.logger.log('outgoing payments recieved post! body: ', stringdata);
        const outgoingPayments = await this.outgoingPaymentsService.addPayment(data);

        return outgoingPayments;
    }
}
