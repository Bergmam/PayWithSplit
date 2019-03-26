export class CreateSubscriberDTO {
    readonly id: number;
    readonly user: string;
    readonly amountLeft: number;
    readonly currency: string;
    readonly nextPayment: number;
}