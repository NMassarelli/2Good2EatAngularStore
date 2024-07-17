import { Component, Input } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Transformation } from 'imagekit-javascript/dist/src/interfaces/Transformation';
import { ImagekitioAngularModule } from 'imagekitio-angular';
@Component({
  selector: 'product',
  standalone: true,
  imports: [MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    RouterLink,
    NgOptimizedImage,
    ImagekitioAngularModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({ required: true }) product!: ProductModel;
  placeholderBlurTransformation: Array<Transformation> = [{
    height: "50",
    width: "50",
  }];
  lqip = {
    active: true
  };


  getPrice(price: string, currencyFormat: string): string {
    let convertedPrice = parseInt(price);
    return convertedPrice.toLocaleString('us-US', { style: 'currency', currency: currencyFormat });

  }


}
