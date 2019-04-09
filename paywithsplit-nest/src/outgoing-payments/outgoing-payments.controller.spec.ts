import { Test, TestingModule } from '@nestjs/testing';
import { OutgoingPaymentsController } from './outgoing-payments.controller';

describe('OutgoingPayments Controller', () => {
  let controller: OutgoingPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutgoingPaymentsController],
    }).compile();

    controller = module.get<OutgoingPaymentsController>(OutgoingPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
