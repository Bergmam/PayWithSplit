export class CreateSubscriberDTO {
    readonly id: number;
    readonly name: string;
    readonly amountLeft: number;
    readonly currency: string;
    readonly nextPayment: string;
    readonly address: string;
}