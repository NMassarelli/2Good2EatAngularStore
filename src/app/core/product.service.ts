import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ProductModel } from '../shared/models/product.model';
import { ErrorHandlerService } from '../shared/errorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

    productUrl = "/";
  getProducts(): Observable<ProductModel[]> {

    return this.http.get<ProductModel[]>(this.productUrl)
      .pipe(
        tap(_ => this.errorHandler.log('fetched products','ProductService')),
        catchError(this.errorHandler.handleError<ProductModel[]>('ProductsService', []))
      );
  }
  
}
