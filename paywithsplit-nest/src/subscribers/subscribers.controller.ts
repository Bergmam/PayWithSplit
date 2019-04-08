import { Controller, Get, Param, Post, Body, Delete, Query, Logger} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

const puppeteer = require('puppeteer')

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

        async function run() {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://localhost:3000/NormalCheckout');

            const buttonSelector = '#root > div > div:nth-child(1) > div > div:nth-child(2) > button';
            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);
            

            await page.waitFor(3000);
            await page.screenshot({path: './screenshots/example1.png'});
            
            // TODO: Fetch these values from data

            const frame = await page.frames().find(f => f.name() === 'stripe_checkout_app');
            await frame.$eval('[placeholder="Email"]', el => el.value = "antonbargman@gmail.com");
            await frame.$eval('[placeholder="Name"]', el => el.value = "Anton Bergman");
            await frame.$eval('[placeholder="Street"]', el => el.value = "Lemansgatan 10");
            await frame.$eval('[placeholder="Postcode"]', el => el.value = "41260");
            await frame.$eval('[placeholder="City"]', el => el.value = "Gothenburg");
            
            await page.screenshot({path: './screenshots/example2.png'});
            browser.close();
        }

        

        run().catch(err => console.error(err));

        return subscribers
    }

    @Delete()
    async deletePayment(@Query() query) {
        const subscribers = await this.subscriberService.deleteSubscriber(query.subscriberId);
        return subscribers;
    }
}
