import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadChildren: ()=> import('./auth/login/login.module').then(m=>m.LoginPageModule)
  }, 
  {
    path: 'auth/register',
    loadChildren: ()=> import('./auth/register/register.module').then(m=> m.RegisterPageModule)
  },
  {
    path: 'auth/forgotten-password',
    loadChildren: ()=> import('./auth/forgotten-password/forgotten-password.module').then(m=> m.ForgottenPasswordPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
