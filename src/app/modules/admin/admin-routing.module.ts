import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'app/core/guard/admin/admin.guard';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './page/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './page/admin-login/admin-login.component';
import { ProductManagementComponent } from './page/product-management/product-management.component';
import { UserManagementComponent } from './page/user-management/user-management.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginComponent,
        // canActivate: [AdminGuard],
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'product-management',
        component: ProductManagementComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
