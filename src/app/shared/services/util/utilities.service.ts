import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  makeDropdownFromEnum(e: any): any {
    const arrayManual: { key: string; value: string; }[] = [];

    var list = Object.keys(e);
    list = list.slice(list.length / 2);

    for (const key in list) {
      if (e.hasOwnProperty(key)) {
        arrayManual.push({ key: key, value: e[key] });
      }
    }
    return arrayManual;
  }

}
