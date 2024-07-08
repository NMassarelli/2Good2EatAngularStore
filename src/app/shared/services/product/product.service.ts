import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ProductModel } from '../../../shared/models/product.model';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';
import { ProductSearchModel } from '../../models/search.model';
import { ProductTypeEnum } from '../../enum/product-type.enum';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = "api/Product/GetFilteredProducts/";
  searchTerms: ProductSearchModel = {
    ifDeleted: false,
    ifVisible: true,
    productTypes : [ProductTypeEnum.Candle, ProductTypeEnum.Crochet_Plushie, ProductTypeEnum.Wax_Melt]
  }
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

   

  getProducts(): Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(this.productUrl, this.searchTerms)
      .pipe(
        tap(_ => this.errorHandler.log('fetched products','ProductService')),
        catchError(this.errorHandler.handleError<ProductModel[]>('ProductsService', []))
      );
  }

  
}
