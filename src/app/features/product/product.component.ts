import { Component, Input } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
ip
@Component({
  selector: 'product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: ProductModel;

}
