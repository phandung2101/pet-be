import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './schema/transaction.schema';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get('type/:type')
  findByType(
    @Param('type') type: 'EXPENSE' | 'INCOME',
  ): Promise<Transaction[]> {
    return this.transactionService.findByType(type);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): Promise<Transaction[]> {
    return this.transactionService.findByCategory(category);
  }

  @Get('date-range')
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Transaction[]> {
    return this.transactionService.findByDateRange(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('total/:type')
  calculateTotalByType(
    @Param('type') type: 'EXPENSE' | 'INCOME',
  ): Promise<number> {
    return this.transactionService.calculateTotalByType(type);
  }

  @Get('balance')
  calculateBalance(): Promise<number> {
    return this.transactionService.calculateBalance();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Transaction | null> {
    return this.transactionService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction | null> {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Transaction | null> {
    return this.transactionService.remove(id);
  }
}
