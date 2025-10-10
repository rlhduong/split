import { request } from '@/lib/api';

export const ExpenseService = {
  getExpensesByTripId: async (tripId: string) => {
    const res = await request.get<{ expenses: ExpenseData[] }>(
      `/trips/${tripId}/expenses`
    );
    return res.expenses;
  },

  createExpense: (
    tripId: string,
    data: {
      description: string;
      amount: number;
      payer: string;
      participants: string[];
    }
  ) => request.post(`/trips/${tripId}/expenses`, data),

  updateExpense: (
    tripId: string,
    expenseId: string,
    data: {
      description?: string;
      amount?: number;
      payer?: string;
      participants?: string[];
    }
  ) => request.put(`/trips/${tripId}/expenses/${expenseId}`, data),

  deleteExpense: (tripId: string, expenseId: string) =>
    request.delete(`/trips/${tripId}/expenses/${expenseId}`),

  settle: async (tripId: string) => {
    const res = await request.get<{ settlements: Settlement[] }>(
      `/trips/${tripId}/expenses/settle`
    );
    return res.settlements;
  },
};
