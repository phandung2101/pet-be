import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const currentDate = new Date();
    const newTransaction = new this.transactionModel({
      ...createTransactionDto,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    
    return newTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async findByType(type: 'EXPENSE' | 'INCOME'): Promise<Transaction[]> {
    return this.transactionModel.find({ type }).exec();
  }

  async findByCategory(category: string): Promise<Transaction[]> {
    return this.transactionModel.find({ category }).exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    return this.transactionModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionModel.findById(id).exec();
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction | null> {
    return this.transactionModel.findByIdAndUpdate(
      id,
      {
        ...updateTransactionDto,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec();
  }

  async remove(id: string): Promise<Transaction | null> {
    return this.transactionModel.findByIdAndDelete(id).exec();
  }

  async calculateTotalByType(type: 'EXPENSE' | 'INCOME'): Promise<number> {
    const result = await this.transactionModel.aggregate([
      { $match: { type } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).exec();
    
    return result.length > 0 ? result[0].total : 0;
  }

  async calculateBalance(): Promise<number> {
    const totalIncome = await this.calculateTotalByType('INCOME');
    const totalExpense = await this.calculateTotalByType('EXPENSE');
    
    return totalIncome - totalExpense;
  }
}