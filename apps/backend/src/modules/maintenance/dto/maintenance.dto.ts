import { z } from 'zod';

export const CreateMaintenanceRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  residentId: z.string().uuid(),
  unitId: z.string().uuid(),
  categoryId: z.string().uuid(),
  mediaKeys: z.array(z.string()).optional(),
});

export type CreateMaintenanceRequestDto = z.infer<typeof CreateMaintenanceRequestSchema>;

export const CreateBookingSchema = z.object({
  requestId: z.string().uuid(),
  technicianId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  totalAmount: z.number().positive(),
});

export type CreateBookingDto = z.infer<typeof CreateBookingSchema>;

export const UpdateBookingStatusSchema = z.object({
  status: z.enum(['PROPOSED', 'ACCEPTED', 'DECLINED', 'IN_ROUTE', 'WORK_STARTED', 'COMPLETED', 'CANCELLED']),
});

export type UpdateBookingStatusDto = z.infer<typeof UpdateBookingStatusSchema>;
