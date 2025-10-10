import { useState } from 'react';

interface ExpenseBarChartData {
  category: string;
  amount: number;
}

export const useExpenseBarChartData = (expenses: ExpenseData[]) => {
  const convertToBarChartData = (expenses: ExpenseData[]) => {
    const valueToLabel: Record<string, string> = {
      // Accommodation
      Hotels: 'Accommodation',
      Airbnb: 'Accommodation',
      Camping: 'Accommodation',
      Resorts: 'Accommodation',

      // Transportation
      'Public Transit': 'Transportation',
      Taxi: 'Transportation',
      'Car Rental': 'Transportation',
      Fuel: 'Transportation',
      Flights: 'Transportation',
      Parking: 'Transportation',

      // Food & Drinks
      Groceries: 'Food & Drinks',
      Restaurants: 'Food & Drinks',
      Cafes: 'Food & Drinks',
      Bars: 'Food & Drinks',

      // Shopping
      Souvenirs: 'Shopping',
      Clothing: 'Shopping',
      Electronics: 'Shopping',
      Gifts: 'Shopping',

      // Health
      Pharmacy: 'Health',
      'Doctor Visits': 'Health',

      // Utilities
      'Internet/WiFi': 'Utilities',
      'Phone/Data': 'Utilities',
      Laundry: 'Utilities',
      'ATM Fees': 'Utilities',
      'Currency Exchange': 'Utilities',

      // Miscellaneous
      'Other Expenses': 'Miscellaneous',
    };

    const categorySums: Record<string, number> = {
      Accommodation: 0,
      Transportation: 0,
      'Food & Drinks': 0,
      Shopping: 0,
      Health: 0,
      Utilities: 0,
      Miscellaneous: 0,
    };

    for (const expense of expenses) {
      categorySums[valueToLabel[expense.category]] += expense.amount;
    }

    const result: ExpenseBarChartData[] = Object.entries(categorySums).map(
      ([category, amount]) => ({ category, amount })
    );

    return result.sort((a, b) => b.amount - a.amount);
  };

  const [barChartData, setBarChartData] = useState(
    convertToBarChartData(expenses)
  );

  const updateBarChartData = (newExpenses: ExpenseData[]) => {
    const newBarChartData = convertToBarChartData(newExpenses);
    setBarChartData(newBarChartData);
  };

  return { barChartData, updateBarChartData };
};
