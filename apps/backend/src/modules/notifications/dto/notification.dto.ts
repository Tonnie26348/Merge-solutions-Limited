import { z } from 'zod';

export const CreateNotificationSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1),
  body: z.string().min(1),
  type: z.enum(['SYSTEM', 'CHAT', 'BOOKING', 'PAYMENT', 'VACANCY']),
  payload: z.record(z.any()).optional(),
});

export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;
