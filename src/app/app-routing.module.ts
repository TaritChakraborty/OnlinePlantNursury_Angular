import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlantComponent } from './product/plant/plant.component';
import { PlanterComponent } from './product/planter/planter.component';
import { ProductComponent } from './product/product.component';
import { SeedComponent } from './product/seed/seed.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo:'/welcome', pathMatch: 'full'}, 
  { path: 'welcome', component: WelcomeComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'add-customer', component: AddCustomerComponent },  
  { path: 'home/:username/:password', component: ProfileComponent },
  { path: 'products', component: ProductComponent, children:[
    { path: 'seeds', component: SeedComponent },
    { path: 'plants', component: PlantComponent },
    { path: 'planters', component: PlanterComponent }
  ] },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin-home/:username/:password', component: AdminComponent }, 
   
  { path: "**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const myRoutings=[
  CustomerComponent, AddCustomerComponent
];
