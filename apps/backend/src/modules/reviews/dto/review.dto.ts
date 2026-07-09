import { z } from 'zod';

export const CreateReviewSchema = z.object({
  bookingId: z.string().uuid(),
  targetTechnicianId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  qualityRating: z.number().int().min(1).max(5),
  speedRating: z.number().int().min(1).max(5),
  professionalismRating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export type CreateReviewDto = z.infer<typeof CreateReviewSchema>;
