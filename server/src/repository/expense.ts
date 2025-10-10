import { v4 as uuidv4 } from 'uuid';
import Expense from '../models/Expense.model';
import { ExpenseData } from '../types';

export const ExpenseRepository = {
  getExpenseById: async (expenseId: string) => {
    return await Expense.get(expenseId);
  },
  getAllExpenses: async (tripId: string) => {
    const expenses = await Expense.query('tripId')
      .eq(tripId)
      .sort('descending')
      .exec();
    return expenses;
  },
  createExpense: async (newExpense: ExpenseData) => {
    const expense = new Expense({
      id: uuidv4(),
      ...newExpense,
    });
    await expense.save();
    return expense;
  },
  updateExpense: async (
    expenseId: string,
    updatedFields: Partial<ExpenseData>
  ) => {
    const expense = await Expense.update({ id: expenseId }, updatedFields);
    return expense;
  },
  deleteExpense: async (expenseId: string) => {
    await Expense.delete(expenseId);
  },
};
