import { Request, Response } from 'express';
import Trip from '../models/Trip.model';
import { ExpenseService } from '../service/expense';

import { Participant } from '../types';

export const getAllExpenses = async (req: Request, res: Response) => {
  const tripId = req.params.tripId;

  try {
    const expenses = await ExpenseService.getAllExpenses(tripId);
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  const { description, amount, date, payer, participants } = req.body;

  try {
    const trip = req.trip!;
    const expense = await ExpenseService.createExpense(trip, {
      tripId: trip.id as string,
      description,
      amount,
      date,
      payer,
      participants,
    });
    res.status(200).json({ message: 'Expense added successfully', expense });
  } catch (error: any) {
    if (error.message === `${payer} is not inside the trip`) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params;

  try {
    const trip = req.trip!;
    await ExpenseService.deleteExpense(trip, expenseId);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const settle = async (req: Request, res: Response) => {
  try {
    const trip = req.trip!;
    const settlements = await ExpenseService.settle(trip);

    res.status(200).json({ settlements });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
