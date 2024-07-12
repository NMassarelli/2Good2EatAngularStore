import { Component, Input } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'product',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input()product!: ProductModel;

  constructor(){
    console.log(this.product)
  }

}
