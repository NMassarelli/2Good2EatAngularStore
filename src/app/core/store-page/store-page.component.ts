import { ProductSearchModel } from './../../shared/models/search.model';
import { MatIconButton } from '@angular/material/button';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductModel } from '../../shared/models/product.model';
import { ProductComponent } from '../product/product.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductTypeEnum } from '../../shared/enum/product-type.enum';
import { UtilitiesService } from '../../shared/services/util/utilities.service';
import { MatList } from '@angular/material/list';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'store-page',
  standalone: true,
  imports: [MatGridListModule,
    MatPaginatorModule,
    ProductComponent,
    MatSidenavModule,
    AsyncPipe,
    ImagekitioAngularModule,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatList,
    MatOption,
    MatSelect,
    MatChipsModule
  ],

  providers: [ProductService],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent implements OnInit {

  private util = inject(UtilitiesService);

  itemPerPageCount!: number;
  productObv$!: Observable<ProductModel[]>;
  TotalProducts!: number;
  pageCount!: number;
  productList!: ProductModel[];
  productService;
  productTypeOptions: { key: number, value: string }[];
  selectedFilters: any;
  filter!: ProductSearchModel;


  constructor() {
    this.productService = inject(ProductService);
    this.productTypeOptions = this.util.makeDropdownFromEnum(ProductTypeEnum);
    this.productTypeOptions = this.productTypeOptions.slice(1);
  }

  ngOnInit(): void {
    this.filter = {
      showDeleted: false,
      showInvisible: false,
      productTypes: [ProductTypeEnum.Candle,ProductTypeEnum.Crochet_Item,ProductTypeEnum.Wax_Melt]
    };
    this.productObv$ = this.productService.getFilteredProducts(this.filter);
  }

  getProductSlice(): void {

  }

  CalcPageCount() {
    this.pageCount = this.TotalProducts / this.itemPerPageCount;
  }

  onFilterChange($event: any) {

    $event.value.forEach((element: string) => {
      switch (element) {
        case "show Deleted":
          this.filter.showDeleted = true;
          break;
        case "show Invisible":
          this.filter.showInvisible = true;
          break;
        default:
          let foundValue = this.util.convertStringToProductEnumValue(element);
          this.filter.productTypes.push(foundValue)
          break;

      }
    });

   this.productObv$ = this.productService.getFilteredProducts(this.filter);
   this.filter = {
      showDeleted: false,
      showInvisible: false,
      productTypes: []
    };
  }



}
