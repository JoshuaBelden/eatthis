import * as moment from 'moment';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
    transform(date, format) {
        return moment(date).format(format);
    }
}
