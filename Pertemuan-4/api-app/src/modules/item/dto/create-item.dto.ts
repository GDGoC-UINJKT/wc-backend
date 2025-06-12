import { z } from 'zod';

export const CreateItemDtoSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export type CreateItemDto = z.infer<typeof CreateItemDtoSchema>;
