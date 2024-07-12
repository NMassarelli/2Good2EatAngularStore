import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service'
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatPaginatorModule} from '@angular/material/paginator'
import { ProductModel } from '../../shared/models/product.model';
import { ProductComponent } from '../product/product.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'store-page',
  standalone: true,
  imports: [ MatGridListModule,MatPaginatorModule, ProductComponent,MatSidenavModule, AsyncPipe, ],
  providers:[ProductService],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit, OnDestroy {
  itemPerPageCount!: number;
  productObv$ : Observable<ProductModel[]>;
  TotalProducts!: number;
  pageCount!: number;
  productList! : ProductModel[];
  productService;
  constructor(){
    this.productService = inject(ProductService);
    this.productObv$ = this.productService.getProducts();

  }
  ngOnDestroy(): void {

  }
  
  ngOnInit(): void {
   
  }

  getProductSlice() : void{
    
  }

  CalcPageCount()
  {
      this.pageCount = this.TotalProducts / this.itemPerPageCount;
  }

}
