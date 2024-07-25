import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductModel } from '../../../shared/models/product.model';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getFilteredProductsURL = "api/Product/GetFilteredProducts/";
  saveProductURL = "api/Product/Save";
  getProductURL = "api/Product/";
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) {
    this.getFilteredProducts();
  }


  getFilteredProducts(searchTerm? : any): Observable<ProductModel[]> {
    return this.populateProducts(searchTerm);
  }

  private populateProducts(searchTerms : any): Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(this.getFilteredProductsURL, searchTerms)
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
  }


  getProduct(id : number): Observable<ProductModel>
  {
    return this.http.get<ProductModel>(`${this.getProductURL}/${id}`).pipe(
      tap(_ => this.errorHandler.log('get product', 'ProductService')),
      catchError(this.errorHandler.handleError<ProductModel>('ProductsService'))
    );
  }



}
