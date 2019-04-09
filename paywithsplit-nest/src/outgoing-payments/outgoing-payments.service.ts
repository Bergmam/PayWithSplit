import { Injectable, HttpException, Logger } from '@nestjs/common';
import { OUTGOING_PAYMENTS } from '../fakedb/payments.fakedb';

@Injectable()
export class OutgoingPaymentsService {
    private readonly logger = new Logger(OutgoingPaymentsService.name);
    outgoingPayments = OUTGOING_PAYMENTS;

    getAllPayments(): Promise<any>{
        return new Promise(resolve => {
            resolve(this.outgoingPayments);
        })
    }

    addPayment(payment): Promise<any>{
        let paymentJson = JSON.stringify(payment, null, 2)
        this.logger.log('outgoing payment', paymentJson)
        return new Promise(resolve => {
            this.outgoingPayments.push(payment)
            resolve(this.outgoingPayments);
        })
    }
}
