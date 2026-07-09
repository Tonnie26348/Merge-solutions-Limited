import { z } from 'zod';

export const CreateWalletSchema = z.object({
  walletType: z.enum(['RESIDENT', 'TECHNICIAN', 'LANDLORD', 'BUILDING_MAINTENANCE', 'PLATFORM_COMMISSION']),
  userId: z.string().uuid().optional(),
  residentId: z.string().uuid().optional(),
  technicianId: z.string().uuid().optional(),
  apartmentId: z.string().uuid().optional(),
  currency: z.string().default('KES'),
});

export type CreateWalletDto = z.infer<typeof CreateWalletSchema>;

export const DepositFundsSchema = z.object({
  walletId: z.string().uuid(),
  amount: z.number().positive(),
  gateway: z.enum(['MPESA_DARAJA', 'STRIPE', 'WALLET']),
  reference: z.string().min(1),
});

export type DepositFundsDto = z.infer<typeof DepositFundsSchema>;

export const TransferFundsSchema = z.object({
  senderWalletId: z.string().uuid(),
  recipientWalletId: z.string().uuid(),
  amount: z.number().positive(),
  type: z.enum(['DEPOSIT', 'WITHDRAWAL', 'RENT_PAYMENT', 'SERVICE_CHARGE', 'MAINTENANCE_ESCROW', 'ESCROW_RELEASE', 'COMMISSION_FEE', 'COLLABORATION_SPLIT', 'REFUND']),
  description: z.string().optional(),
});

export type TransferFundsDto = z.infer<typeof TransferFundsSchema>;
