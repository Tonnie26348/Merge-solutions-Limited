import { z } from 'zod';

export const CreateChatSchema = z.object({
  userIds: z.array(z.string().uuid()).min(2),
  type: z.enum(['DIRECT', 'JOB_GROUP', 'COMMUNITY_BOARD']).default('DIRECT'),
  bookingId: z.string().uuid().optional(),
});

export type CreateChatDto = z.infer<typeof CreateChatSchema>;

export const SendMessageSchema = z.object({
  chatId: z.string().uuid(),
  content: z.string().min(1),
  type: z.enum(['TEXT', 'IMAGE', 'DOCUMENT', 'LOCATION']).default('TEXT'),
  mediaKey: z.string().optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;
