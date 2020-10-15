import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "orders", component: OrdersComponent
  },
  {
    path: "order/:id", component: OrderComponent
  },
  {
    path: "payment", component: PaymentComponent
  },
  {
    path: "menu", component: MenuComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "**", component: HomeComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
