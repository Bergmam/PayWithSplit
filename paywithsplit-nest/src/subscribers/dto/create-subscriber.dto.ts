export class CreateSubscriberDTO {
    readonly id: string;
    readonly name: string;
    readonly amountLeft: number;
    readonly currency: string;
    readonly nextPayment: string;
    readonly address: string;
}