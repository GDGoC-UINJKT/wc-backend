import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly zodSchema: any) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    try {
      this.zodSchema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw error;
    }

    return value;
  }
}
