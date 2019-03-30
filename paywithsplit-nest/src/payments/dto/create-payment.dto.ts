export class CreatePaymentDTO {
    stripeEmail: string;
    stripeToken: string;
    stripeTokenType: string;
    stripeBillingName: string;
    stripeBillingAddressLine1: string;
}