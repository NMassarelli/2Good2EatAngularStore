import { RegistrationComponent } from './core/registration/registration.component';
import { Routes } from '@angular/router';
import { StorePageComponent } from './core/store-page/store-page.component';
import { AddEditProductPageComponent } from './core/add-edit-product-page/add-edit-product-page.component';
import { LoginComponent } from './core/login/login.component';

export const routes: Routes = [
    {path:'', component: StorePageComponent},
    {path:'addEditProduct', component:AddEditProductPageComponent},
    {path:'addEditProduct/:id', component:AddEditProductPageComponent},
    {path:'/register', component:RegistrationComponent},
    {path:'/login', component:LoginComponent}
];
