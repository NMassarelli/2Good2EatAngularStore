import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { MatList, MatListItem } from '@angular/material/list'
import {MatPaginatorModule} from '@angular/material/paginator'
import { ProductModel } from '../../shared/models/product.model';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'store-page',
  standalone: true,
  imports: [MatList, MatListItem, MatPaginatorModule, ProductComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {
  itemPerPageCount!: number;
  productList!: ProductModel[];
  TotalProducts: number = this.productList.length;
  pageCount!: number;

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.getProductSlice();
  }

  getProductSlice() : void{
    this.productService.getProducts().subscribe(products => this.productList = products.slice(1,5));
  }

  CalcPageCount()
  {
      this.pageCount = this.TotalProducts / this.itemPerPageCount;
  }

}
