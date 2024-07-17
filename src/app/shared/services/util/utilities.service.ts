import { Injectable } from '@angular/core';
import { ProductTypeEnum } from '../../enum/product-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }


  //I'd like to turn this into a  dropdown component that takes an enum
  makeDropdownFromEnum(e: any): { key: number, value: string }[] {
    const arrayManual: { key: number; value: string; }[] = [];

    var list = Object.keys(e);
    list = list.slice(list.length / 2);

    for (const key in list) {
      if (e.hasOwnProperty(key)) {
        arrayManual.push({ key: parseInt(key), value: this.removeCharactersFromString(e[key], '_',' ') });
      }
    }
    return arrayManual;
  }

  convertStringToProductEnumValue(e: string) : number
  {
    var list = Object.keys(ProductTypeEnum);
    list = list.slice(list.length / 2);

    return list.indexOf(this.removeCharactersFromString(e,' ', '_'));
  }

  removeCharactersFromString(originString: string, removeableChar : string,  replacement? :string ): string{
    if(!replacement)
        replacement = '';

    return originString.replaceAll(removeableChar,replacement)
  }




}
