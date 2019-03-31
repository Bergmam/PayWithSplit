import { Controller, Get, Param, Post, Body, Delete, Query, Logger} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
    constructor(private subscriberService: SubscribersService) {}

    private readonly logger = new Logger(SubscribersController.name);

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
    async addPayment(@Body() data: CreateSubscriberDTO) {
        let stringdata = JSON.stringify(data, null, 2);
        this.logger.log('subscriber controller recieved post! body: ', stringdata);
        const subscribers = await this.subscriberService.addSubscriber(data);
        return subscribers;
    }

    @Delete()
    async deletePayment(@Query() query) {
        const subscribers = await this.subscriberService.deleteSubscriber(query.subscriberId);
        return subscribers;
    }


}
