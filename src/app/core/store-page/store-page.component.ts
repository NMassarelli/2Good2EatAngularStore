import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service'
import { MatList, MatListItem } from '@angular/material/list'
import {MatPaginatorModule} from '@angular/material/paginator'
import { ProductModel } from '../../shared/models/product.model';
import { ProductComponent } from '../product/product.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'store-page',
  standalone: true,
  imports: [MatList, MatListItem, MatPaginatorModule, ProductComponent, MatCheckboxModule,MatSidenavModule],
  providers:[ProductService],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit, OnDestroy {
  itemPerPageCount!: number;
  productList!: ProductModel[];
  productSub! : Subscription;
  TotalProducts!: number;
  pageCount!: number;
  
  constructor(private productService: ProductService){

  }
  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
  
  ngOnInit(): void {
   this.productSub = this.productService.getProducts().subscribe(
    product => {
      this.productList = product,
      this.TotalProducts = product.length
      
   
   });
  }

  getProductSlice() : void{
    
  }

  CalcPageCount()
  {
      this.pageCount = this.TotalProducts / this.itemPerPageCount;
  }

}
