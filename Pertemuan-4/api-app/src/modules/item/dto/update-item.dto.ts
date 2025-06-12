import { CreateItemDtoSchema } from './create-item.dto';
import { z } from 'zod';

export const UpdateItemDtoSchema = CreateItemDtoSchema;

export type UpdateItemDto = z.infer<typeof UpdateItemDtoSchema>;
