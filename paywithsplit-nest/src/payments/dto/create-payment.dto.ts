export class CreatePaymentDTO {
    id: string;
    userId: string;
    amount: number;
    paymentToken: string;
    billingName: string;
    billingAddress: string;
    billingZip: string;
    billingCity: string;
    time: number;
}