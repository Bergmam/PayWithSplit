import { Injectable, HttpException } from '@nestjs/common';
import { PAYMENTS } from '../fakedb/payments.fakedb';


@Injectable()
export class PaymentsService {
    payments = PAYMENTS;

    getAllPayments(): Promise<any>{
        return new Promise(resolve => {
            resolve(this.payments);
        })
    }
    
    getPaymentsByUserId(userId): Promise<any> {
        let id = Number(userId)
        let userPayments = []
        return new Promise(resolve => {
            this.payments.forEach(payment => {
                if (payment.userId === id) userPayments.push(payment)
                userPayments.push(payment)
            });
            resolve(userPayments);
        })
    }

    addPayment(payment): Promise<any>{
        return new Promise(resolve => {
            this.payments.push(payment)
            resolve(this.payments);
        })
    }

    deletePayment(payment): Promise<any>{
        let id = Number(payment);
        return new Promise(resolve => {
            let index = this.payments.findIndex(payment => payment.id === id);
            if (index === -1){
                throw new  HttpException('No such payment', payment);
            }
            this.payments.splice(1, index);
            resolve(this.payments);
        })
    }
}
