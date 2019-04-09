import { Test, TestingModule } from '@nestjs/testing';
import { OutgoingPaymentsService } from './outgoing-payments.service';

describe('OutgoingPaymentsService', () => {
  let service: OutgoingPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutgoingPaymentsService],
    }).compile();

    service = module.get<OutgoingPaymentsService>(OutgoingPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
