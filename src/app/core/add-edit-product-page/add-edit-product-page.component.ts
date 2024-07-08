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
// Import the CloudinaryModule.
import {CloudinaryModule} from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen/index';
import { ScriptService } from '../../shared/services/script/script.service';

// Import the Cloudinary classes.


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
            CloudinaryModule
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
  img!: CloudinaryImage;
  cloudName = "twogoodtwoeat"; // replace with your own cloud name
  uploadPreset = "ml_default"; // replace with your own upload preset
  uploadedImage = '';
  isDisabled = false;
  uploadedImages: string[] = [];



  constructor (private formBuilder: FormBuilder, private scriptService: ScriptService) {}


  ngOnInit(): void {
    this.scriptService.load('cloudinaryUpload');
    if(this.product == null){
      this.productForm?.patchValue(new ProductModel())
    } else {
    this.productForm = this.formBuilder.group(this.product);
    }
    this.productTypeOptions = Object.keys(ProductTypeEnum);
    this.productTypeOptions = this.productTypeOptions.slice(this.productTypeOptions.length / 2);
    
    const cld = new Cloudinary({
      cloud: {
        cloudName: this.cloudName,
        apiKey: process.env["CLOUDINARY_API_KEY"],
        apiSecret: process.env["CLOUDINARY_SECRET"]
      }
    });
   
  }

  processResults = (error: any, result: any): void => {
    if (result.event === 'close') {
      this.isDisabled = false;
    }
    if (result && result.event === 'success') {
      const secureUrl = result.info.secure_url;
      const previewUrl = secureUrl.replace('/upload/', '/upload/w_400/');
      this.uploadedImages.push(previewUrl);
      this.isDisabled = false;
    }
    if (error) {
      this.isDisabled = false;
    }
  };



  uploadWidget = (): void => {
    this.isDisabled = true;
    window.cloudinary.openUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        sources: ['local'],
        tags: ['myphotoalbum-angular'],
        clientAllowedFormats: ['image'],
        resourceType: 'image',
      },
      this.processResults
    );
  };


  public Save(): void{

  }
}
