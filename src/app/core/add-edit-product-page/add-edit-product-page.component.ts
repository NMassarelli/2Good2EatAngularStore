import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ActivatedRoute, RedirectCommand, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../shared/models/product.model';

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
    ImagekitioAngularModule,
    RouterOutlet,
  RouterLink],
  templateUrl: './add-edit-product-page.component.html',
  styleUrl: './add-edit-product-page.component.scss'
})
export class AddEditProductPageComponent implements OnInit, OnDestroy {


  productForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    productImageURL: new FormControl<string>('', Validators.required),
    wholesalePrice: new FormControl<string>('', Validators.required),
    retailPrice: new FormControl<string>('', Validators.required),
    inventory: new FormControl<number>(0, Validators.required),
    isVisible: new FormControl<boolean>(true, Validators.required),
    isDeleted: new FormControl<boolean>(false, Validators.required),
    productType: new FormControl<ProductTypeEnum>(ProductTypeEnum.None, Validators.required),
  });


  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private util = inject(UtilitiesService);
  authService = inject(AuthenticationService);


  productId: string = '';
  providedName: string = "";
  uploadErrorMessage = "";
  productTypeOptions: { key: number; value: string; }[] = [];
  isDisabled = false;
  uploadedImages: string[] = [];
  isImageUploadFinished = false;
  yesNoEnum: { key: number; value: string; }[] = [];
  wasImageUploadSuccessful: boolean = false;
  sub!: Subscription;
  fileNameValue: string = "";
  productTypeSelection: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    if (this.productId != null) {
      this.productService.getProduct(Number.parseInt(this.productId)).subscribe(
        product => this.applyToForm(product)
      );
    }

    this.productTypeOptions = this.util.makeDropdownFromEnum(ProductTypeEnum);
    this.yesNoEnum = this.util.makeDropdownFromEnum(YesNoEnum);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleUploadError(err: any) {
    console.log('There was an error in upload: ', err);
    this.uploadErrorMessage = 'File upload failed.';
    this.wasImageUploadSuccessful = false;
    this.isImageUploadFinished = true;
  }

  applyToForm(product: ProductModel) {
    this.productForm.patchValue(product);
    this.productForm.markAsTouched();
  }


  handleUploadSuccess(res: any) {
    this.productForm.controls.productImageURL.setValue(res.name);
    this.isImageUploadFinished = true;
    this.wasImageUploadSuccessful = true;
  }

  save() {
    this.productService.saveProduct(this.productForm.getRawValue());
    this.router.navigate(['/']);
  }

  isYes(key: number): boolean {
    return key == 1;
  }

  productComparefn(kp1: ProductTypeEnum, kp2: ProductTypeEnum): boolean {
    return (kp1 as number) == (kp2 as number);
  }

  yesNoCompareFunction(kp1: YesNoEnum, kp2: YesNoEnum) {
    return (kp1 as number) == (kp2 as number);

  }

}
