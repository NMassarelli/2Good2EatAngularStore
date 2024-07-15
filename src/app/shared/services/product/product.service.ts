import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { ProductModel } from '../../../shared/models/product.model';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';
import { ProductSearchModel } from '../../models/search.model';
import { ProductTypeEnum } from '../../enum/product-type.enum';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getFilteredProductsURL = "api/Product/GetFilteredProducts/";
  saveProductURL = "api/Product/Save";
  getProductURL = "api/Product/";
  searchTerms: ProductSearchModel = {
    showDeleted: false,
    showInvisible: false,
    productTypes: [ProductTypeEnum.Candle, ProductTypeEnum.Crochet_Plushie, ProductTypeEnum.Wax_Melt]
  };
  private productList$!: Observable<ProductModel[]>;
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) {
    this.refreshProducts();
  }


  getProducts(): Observable<ProductModel[]> {
    return this.productList$;
  }

  private populateProducts(): Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(this.getFilteredProductsURL, this.searchTerms)
      .pipe(
        tap(_ => this.errorHandler.log('fetched products', 'ProductService')),
        catchError(this.errorHandler.handleError<ProductModel[]>('ProductsService', []))
      );
  }

  saveProduct(product: any): void
  {
    this.http.post<void>(this.saveProductURL, product).pipe(
      tap(_ => this.errorHandler.log('save product', 'ProductService')),
      catchError(this.errorHandler.handleError<void>('ProductsService'))
    ).subscribe();

    this.refreshProducts();
  }


  getProduct(id : number): Observable<ProductModel>
  {
    return this.http.get<ProductModel>(`${this.getProductURL}/${id}`).pipe(
      tap(_ => this.errorHandler.log('get product', 'ProductService')),
      catchError(this.errorHandler.handleError<ProductModel>('ProductsService'))
    );
  }

  refreshProducts() : void {
    this.productList$ = this.populateProducts();
  }

}
