export class CreatePaymentDTO {
    readonly id: number;
    readonly userId: number;
    readonly amount: number;
    readonly currency: string;
    readonly time: number;
}