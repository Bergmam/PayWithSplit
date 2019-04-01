export class CreatePaymentDTO {
    id: string;
    userId: string;
    amount: number;
    paymentToken: string;
    billingName: string;
    billingAddress: string;
    time: number;
}