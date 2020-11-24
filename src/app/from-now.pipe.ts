import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: string, ...args: Array<unknown>): string {
    const date = parseISO(value);
    console.log('value', value, 'date', date);
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }

}
