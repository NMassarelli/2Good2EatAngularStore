import { Routes } from '@angular/router';
import { StorePageComponent } from './core/store-page/store-page.component';
import { AddEditProductPageComponent } from './core/add-edit-product-page/add-edit-product-page.component';

export const routes: Routes = [
    {path:'', component: StorePageComponent},
    {path:'addEditProduct', component:AddEditProductPageComponent}
];
