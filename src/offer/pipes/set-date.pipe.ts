import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class SetDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const now = new Date();

    const formatted_date = format(now, 'dd/MM/yyyy');

    value.date = formatted_date;

    return value;
  }
}
