import { Controller, Get, Param, Post, Body, Delete, Query, Logger, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './dto/create-payment.dto';

const puppeteer = require('puppeteer')

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
        this.logger.log('payments recieved post! body: ', stringdata);
        const payments = await this.paymentsService.addPayment(data);

        async function run() {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://localhost:3000/NormalCheckout');
        
            const buttonSelector = '#root > div > div:nth-child(1) > div > div:nth-child(2) > button';
            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);
            
        
            await page.waitFor(5000);
        
            const frame = await page.frames().find(f => f.name() === 'stripe_checkout_app');
            
            // This data should be taken from the 'data' variable, but due to Split limitations 
            // we use some dummy data here
            await frame.type('[placeholder="Email"]', 'antonbargman@gmail.com', {delay: 20});
            await frame.type('[placeholder="Name"]', data.billingName, {delay: 20});
            await frame.type('[placeholder="Street"]', data.billingAddress, {delay: 20});
            await frame.type('[placeholder="Postcode"]', data.billingZip, {delay: 20});
            await frame.type('[placeholder="City"]', data.billingCity, {delay: 20});
        
            await page.screenshot({path: './screenshots/example1.png'});
        
            await page.keyboard.press('Enter');
            await page.waitFor(5000);
            
            await page.screenshot({path: './screenshots/example2.png'});
        
            
            await frame.type('[placeholder="Card number"]', "4242424242424242", {delay: 20});
            await frame.type('[placeholder="MM / YY"]', "1020", {delay: 20});
            await frame.type('[placeholder="CVC"]', "111", {delay: 20});
        
            await page.screenshot({path: './screenshots/example3.png'});
            await page.keyboard.press('Enter');
            await page.waitFor(5000);

            await page.screenshot({path: './screenshots/example5.png'});
            
            browser.close();
        }
        

        run().catch(err => console.error(err));
        return payments;
    }

    @Delete()
    async deletePayment(@Query() query) {
        const payments = await this.paymentsService.deletePayment(query.paymentId);
        return payments;
    }

}
