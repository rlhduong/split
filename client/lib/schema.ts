import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Invalid password' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: 'Password must contain at least 1 letter',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least 1 number',
    }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const createTripSchema = z.object({
  name: z.string().min(1, { message: 'Trip name is required' }),
  startDate: z.date({ error: 'A start date is required.' }),
  endDate: z.date({ error: 'An end date is required.' }),
});

export type CreateTripFormData = z.infer<typeof createTripSchema>;

export const travellerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type TravellerFormData = z.infer<typeof travellerSchema>;

export const createExpenseSchema = z.object({
  payer: z.string().min(1, { message: 'Payer is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string(),
  amount: z.number().min(0.01, { message: 'Amount must be at least 0.01' }),
  participants: z
    .array(z.string())
    .min(1, { message: 'At least one participant is required' }),
});

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
