import { z } from 'zod';

export const InitiatePaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('KES'),
  paymentMethod: z.enum(['MPESA', 'STRIPE']),
  phoneNumber: z.string().optional(), // For M-Pesa
  paymentEmail: z.string().email().optional(), // For Stripe
  bookingId: z.string().uuid(),
});

export type InitiatePaymentDto = z.infer<typeof InitiatePaymentSchema>;

export const ProcessRevenueSplitSchema = z.object({
  bookingId: z.string().uuid(),
  totalAmount: z.number().positive(),
});

export type ProcessRevenueSplitDto = z.infer<typeof ProcessRevenueSplitSchema>;
