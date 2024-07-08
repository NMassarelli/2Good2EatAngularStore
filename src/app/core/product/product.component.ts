import { Component, Input } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
import { MatCard, MatCardContent } from '@angular/material/card'
import {  MatFormField } from '@angular/material/form-field'

@Component({
  selector: 'product',
  standalone: true,
  imports: [MatCard, MatCardContent, MatFormField],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: ProductModel;

}
