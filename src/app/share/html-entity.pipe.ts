import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlEntity'
})
export class HtmlEntityPipe implements PipeTransform {

  transform(value: string): string {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(value, 'text/html').documentElement.textContent;
    return decodedString || '';
  }

}
