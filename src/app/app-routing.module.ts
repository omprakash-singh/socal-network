import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';
import { IsLoginGuard } from './Guard/is-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadChildren: ()=> import('./auth/login/login.module').then(m=>m.LoginPageModule),
    canActivate: [IsLoginGuard]
  }, 
  {
    path: 'auth/register',
    loadChildren: ()=> import('./auth/register/register.module').then(m=> m.RegisterPageModule),
    canActivate: [IsLoginGuard]
  },
  {
    path: 'auth/forgotten-password',
    loadChildren: ()=> import('./auth/forgotten-password/forgotten-password.module').then(m=> m.ForgottenPasswordPageModule),
    canActivate: [IsLoginGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
