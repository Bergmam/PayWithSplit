import { Controller, Get, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {}

    @Get()
    async getAllPayments() {
        const payments = await this.paymentsService.getAllPayments();
        return payments;
    }

    @Get(':userId')
    async getPaymentsByUserId(@Param('userId') userId) {
        const payments = await this.paymentsService.getPaymentsByUserId(userId);
        return payments;
    }

    @Post()
    async addPayment(@Body() createPaymentDTO: CreatePaymentDTO) {
        const payment = await this.paymentsService.addPayment(createPaymentDTO);
        return payment;
    }

    @Delete()
    async deletePayment(@Query() query) {
        const payments = await this.paymentsService.deletePayment(query.paymentId);
        return payments;
    }

}
