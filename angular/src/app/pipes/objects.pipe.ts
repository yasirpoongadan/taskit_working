import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objects'
})
export class ObjectsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }

}
