import {Component, inject, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button'
import {ReactiveFormsModule} from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { ProductTypeEnum } from '../../shared/enum/product-type.enum';
import { MatCard } from '@angular/material/card';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ProductService } from '../../shared/services/product/product.service';
import { UtilitiesService } from '../../shared/services/util/utilities.service';
import { YesNoEnum } from '../../shared/enum/yes-no.enum';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'add-edit-product-page',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule, 
            MatSelectModule,
            MatButton,
            MatIcon,
            MatIconButton, 
            ReactiveFormsModule,
            MatList, 
            MatListItem,
            MatCard,
            CurrencyMaskModule,
            ImagekitioAngularModule],
  templateUrl: './add-edit-product-page.component.html',
  styleUrl: './add-edit-product-page.component.scss'
})
export class AddEditProductPageComponent implements OnInit{

  @Input() productId: string = '';
  authService = inject(AuthenticationService)
  private formBuilder = inject(FormBuilder)
  private productService = inject(ProductService);
  private util = inject(UtilitiesService);
  productForm = new FormGroup({
    id:new FormControl<string>(''),
    name:new FormControl<string>('',Validators.required),
    description:new FormControl<string>('',Validators.required),
    productImageURL:new FormControl<string>('',Validators.required),
    wholesalePrice:new FormControl<string>('',Validators.required),
    retailPrice:new FormControl<string>('',Validators.required),
    inventory:new FormControl<number>(0,Validators.required),
    isVisible:new FormControl<boolean>(true,Validators.required),
    isDeleted:new FormControl<boolean>(false,Validators.required),
    productType:new FormControl<number>(0,Validators.required),
  });
  uploadErrorMessage = "";
  productTypeOptions : { key: number; value: string; }[] = [];
  isDisabled = false;
  uploadedImages: string[] = [];
  isImageUploadFinished = false;
  yesNoEnum: { key: number; value: string; }[] = [];
  
  ngOnInit(): void {
    if(this.productId != ''){
      this.productService.getProduct(this.productId).subscribe(
        product => this.productForm.patchValue(product)
      );
    }
    this.productTypeOptions = this.util.makeDropdownFromEnum(ProductTypeEnum);
    this.yesNoEnum = this.util.makeDropdownFromEnum(YesNoEnum);
  }

  handleUploadError(err: any) {
    console.log('There was an error in upload: ', err);
    this.uploadErrorMessage = 'File upload failed.';
  }


  handleUploadSuccess(res: any) {
    this.productForm.controls.productImageURL.setValue(res.url);
    this.isImageUploadFinished = true;
  }

  save(){
    this.productService.saveProduct(this.productForm.getRawValue());
  }

  isYes(key:number) : boolean{
    return key == 1
  }
  
}
