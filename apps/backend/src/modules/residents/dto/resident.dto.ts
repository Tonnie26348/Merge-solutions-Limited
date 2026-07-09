import { z } from 'zod';

export const AssignResidentSchema = z.object({
  userId: z.string().uuid(),
  apartmentId: z.string().uuid(),
  unitId: z.string().uuid().optional(),
  leaseStart: z.string().datetime().optional(),
  leaseEnd: z.string().datetime().optional(),
});

export type AssignResidentDto = z.infer<typeof AssignResidentSchema>;
