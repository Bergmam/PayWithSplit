import { Controller, Get, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
    constructor(private subscriberService: SubscribersService) {}

    @Get()
    async getAllSubscribers() {
        const subscribers = await this.subscriberService.getAllSubscribers();
        return subscribers;
    }

    @Get(':userId')
    async getSubscriberById(@Param('userId') userId) {
        const subscribers = await this.subscriberService.getSubscriberById(userId);
        return subscribers;
    }

    @Post()
    async addPayment(@Body() createPaymentDTO: CreateSubscriberDTO) {
        const subscriber = await this.subscriberService.addSubscriber(createPaymentDTO);
        return subscriber;
    }

    @Delete()
    async deletePayment(@Query() query) {
        const subscribers = await this.subscriberService.deleteSubscriber(query.subscriberId);
        return subscribers;
    }


}
