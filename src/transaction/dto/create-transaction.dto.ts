export class CreateTransactionDto {
    readonly amount: number;
    readonly description: string;
    readonly type: 'EXPENSE' | 'INCOME';
    readonly category?: string;
    readonly date: Date;
  }