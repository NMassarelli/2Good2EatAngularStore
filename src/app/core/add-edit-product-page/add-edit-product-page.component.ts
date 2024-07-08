import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductModel } from '../../shared/models/product.model';
import { FormBuilder, FormsModule, NgModel } from '@angular/forms';
import {MatButton} from '@angular/material/button'
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { ProductTypeEnum } from '../../shared/enum/product-type.enum';
import { MatCard } from '@angular/material/card';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';

@Component({
  selector: 'add-edit-product-page',
  standalone: true,
  imports: [FormsModule, 
            MatFormFieldModule, 
            MatInputModule, 
            MatSelectModule,
            MatButton, 
            ReactiveFormsModule,
            MatList, 
            MatListItem,
            MatCard,
            CurrencyMaskModule,
            FileUploadComponent
          ],
  templateUrl: './add-edit-product-page.component.html',
  styleUrl: './add-edit-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditProductPageComponent implements OnInit{

  @Input() product = new ProductModel();
  productForm!: FormGroup;
  productTypeOptions : string[] | undefined;
  selected!: number;
  constructor (private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    if(this.product == null){
      this.productForm?.patchValue(new ProductModel())
    } else {
    this.productForm = this.formBuilder.group(this.product);
    }
    this.productTypeOptions = Object.keys(ProductTypeEnum);
    this.productTypeOptions = this.productTypeOptions.slice(this.productTypeOptions.length / 2);
  }


  public Save(): void{
    
  }
}
