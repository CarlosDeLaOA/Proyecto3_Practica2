import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { GuestGuard } from './guards/guest.guard';
import { IRoleType } from './interfaces';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { GiftListGiftsComponent } from './pages/gift-list-gifts/gift-list-gifts.component';
import { ProductoComponent } from './pages/producto/product.component';
import { CategoriaComponent } from './pages/categoria/category.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate:[AdminRoleGuard],
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin
          ],
          name: 'Users',
          showInSidebar: true
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          name: 'Dashboard',
          showInSidebar: true
        }
      },
      {
        path: 'gift-list',
        component: GiftListGiftsComponent,
        data: {
          authorities: [
            IRoleType.admin,
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Gift Lists',
          showInSidebar: true
        }
      },
      {
        path: 'gifts',
        component: GiftsComponent,
        data: {
          authorities: [
            IRoleType.admin,
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Gifts',
          showInSidebar: true
        }
      }
    ],
  },
  {path: 'categorias',
        component: CategoriaComponent,
        data: {
          authorities: [
            IRoleType.admin,
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Categorias',
          showInSidebar: true
        }
      },
      {
        path: 'productos',
        component: ProductoComponent,
        data: {
          authorities: [
            IRoleType.admin,
            IRoleType.superAdmin,
            IRoleType.user,
          ],
          name: 'Productos',
          showInSidebar: true
        }
      }
];