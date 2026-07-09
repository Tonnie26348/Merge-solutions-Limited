import { z } from 'zod';

export const CreateApartmentSchema = z.object({
  name: z.string().min(1, 'Apartment name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().default('Kenya'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  logoUrl: z.string().url().optional(),
});

export type CreateApartmentDto = z.infer<typeof CreateApartmentSchema>;

export const CreateBuildingSchema = z.object({
  name: z.string().min(1, 'Building name is required'),
  apartmentId: z.string().uuid(),
});

export type CreateBuildingDto = z.infer<typeof CreateBuildingSchema>;

export const CreateUnitSchema = z.object({
  number: z.string().min(1, 'Unit number is required'),
  floor: z.number().int().min(0),
  rentAmount: z.number().positive(),
  buildingId: z.string().uuid(),
});

export type CreateUnitDto = z.infer<typeof CreateUnitSchema>;
