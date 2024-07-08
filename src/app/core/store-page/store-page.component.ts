import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service'
import { MatList, MatListItem } from '@angular/material/list'
import {MatPaginatorModule} from '@angular/material/paginator'
import { ProductModel } from '../../shared/models/product.model';
import { ProductComponent } from '../product/product.component';
import { HttpClient } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 

@Component({
  selector: 'store-page',
  standalone: true,
  imports: [MatList, MatListItem, MatPaginatorModule, ProductComponent, MatCheckboxModule,MatSidenavModule],
  providers:[ProductService, HttpClient],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {
  itemPerPageCount!: number;
  productList!: ProductModel[];
  TotalProducts!: number;
  pageCount!: number;

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.getProductSlice();
    //this.TotalProducts = this.productList.length;
  }

  getProductSlice() : void{
    this.productService.getProducts().subscribe((products: ProductModel[]) => this.productList = products.slice(1,5));
  }

  CalcPageCount()
  {
      this.pageCount = this.TotalProducts / this.itemPerPageCount;
  }

}
