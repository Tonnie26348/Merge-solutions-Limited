import { z } from 'zod';

export const CreateTechnicianProfileSchema = z.object({
  userId: z.string().uuid(),
  bio: z.string().max(500).optional(),
  experienceYears: z.number().int().min(0).max(50),
  idNumber: z.string().min(5).max(20),
  certifications: z.array(z.string()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateTechnicianProfileDto = z.infer<typeof CreateTechnicianProfileSchema>;

export const UpdateTechnicianStatusSchema = z.object({
  status: z.enum(['PENDING_VERIFICATION', 'VERIFIED', 'SUSPENDED', 'REJECTED']),
});

export type UpdateTechnicianStatusDto = z.infer<typeof UpdateTechnicianStatusSchema>;

export const AddCategoryToTechSchema = z.object({
  technicianId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export type AddCategoryToTechDto = z.infer<typeof AddCategoryToTechSchema>;
