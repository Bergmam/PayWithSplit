import { Injectable, HttpException, Logger } from '@nestjs/common';
import { PAYMENTS } from '../fakedb/payments.fakedb';


@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);
    payments = PAYMENTS;

    getAllPayments(): Promise<any>{
        return new Promise(resolve => {
            resolve(this.payments);
        })
    }
    
    getPaymentsByUserId(userId): Promise<any> {
        //let id = Number(userId)
        let userPayments = []
        return new Promise(resolve => {
            this.payments.forEach(payment => {
                if (payment.userId === userId) userPayments.push(payment)
                userPayments.push(payment)
            });
            resolve(userPayments);
        })
    }

    addPayment(payment): Promise<any>{
        let paymentJson = JSON.stringify(payment, null, 2)
        this.logger.log('payment', paymentJson)
        return new Promise(resolve => {
            this.payments.push(payment)
            resolve(this.payments);
        })
    }

    deletePayment(paymentTodelete): Promise<any>{
        //let id = Number(payment);
        return new Promise(resolve => {
            let index = this.payments.findIndex(payment => payment.id === paymentTodelete);
            if (index === -1){
                throw new HttpException('No such payment', paymentTodelete);
            }
            this.payments.splice(1, index);
            resolve(this.payments);
        })
    }
}
