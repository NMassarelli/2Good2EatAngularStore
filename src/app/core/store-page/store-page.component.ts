import { MatIconButton } from '@angular/material/button';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator'
import { ProductModel } from '../../shared/models/product.model';
import { ProductComponent } from '../product/product.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImagekitioAngularModule } from 'imagekitio-angular';

import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-page',
  standalone: true,
  imports: [ MatGridListModule,
            MatPaginatorModule,
            ProductComponent,
            MatSidenavModule,
            AsyncPipe,
            ImagekitioAngularModule,
            MatIcon,
            MatIconButton,
            RouterLink,
          ],

  providers:[ProductService],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {
  itemPerPageCount!: number;
  productObv$! : Observable<ProductModel[]>;
  TotalProducts!: number;
  pageCount!: number;
  productList! : ProductModel[];
  productService;
  constructor(){
    this.productService = inject(ProductService);

  }
  ngOnInit(): void {
    this.productObv$ = this.productService.getProducts();
  }

  getProductSlice() : void{

  }

  CalcPageCount()
  {
      this.pageCount = this.TotalProducts / this.itemPerPageCount;
  }



}
