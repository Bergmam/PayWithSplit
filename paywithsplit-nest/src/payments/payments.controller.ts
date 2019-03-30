import { Controller, Get, Param, Post, Body, Delete, Query, Logger, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) {}

    private readonly logger = new Logger(PaymentsController.name);

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
    async addPayment(@Body() data : CreatePaymentDTO){
        let stringdata = JSON.stringify(data, null, 2);
        this.logger.log('recieved post! body: ', stringdata);
        this.logger.log('recieved post! body type: ', (data instanceof CreatePaymentDTO).toString());
        const payments = await this.paymentsService.addPayment(data);
        return payments;
    }

    @Delete()
    async deletePayment(@Query() query) {
        const payments = await this.paymentsService.deletePayment(query.paymentId);
        return payments;
    }

}
