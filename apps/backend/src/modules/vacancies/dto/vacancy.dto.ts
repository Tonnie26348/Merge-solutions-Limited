import { z } from 'zod';

export const CreateVacancySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  rentAmount: z.number().positive(),
  depositAmount: z.number().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  landlordId: z.string().uuid(),
  unitId: z.string().uuid().optional(),
  mediaKeys: z.array(z.string()).optional(),
});

export type CreateVacancyDto = z.infer<typeof CreateVacancySchema>;

export const ApplyToVacancySchema = z.object({
  vacancyId: z.string().uuid(),
  applicantId: z.string().uuid(),
  monthlyIncome: z.number().positive(),
  employerName: z.string().optional(),
  applicantNotes: z.string().optional(),
  creditReportUrl: z.string().url().optional(),
  rentHistoryUrl: z.string().url().optional(),
});

export type ApplyToVacancyDto = z.infer<typeof ApplyToVacancySchema>;

export const UpdateApplicationStatusSchema = z.object({
  status: z.enum(['SUBMITTED', 'REVIEWING', 'APPROVED', 'DECLINED']),
});

export type UpdateApplicationStatusDto = z.infer<typeof UpdateApplicationStatusSchema>;
