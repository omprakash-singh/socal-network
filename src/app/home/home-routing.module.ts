import { NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserGuard } from '../Guard/user.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [UserGuard],
    children: [
      {
        path: 'search',
        loadChildren: ()=>import('../HomePages/search/search.module').then((m)=>m.SearchPageModule),
        canActivate: [UserGuard],
      }, 
      {
        path: 'user',
        loadChildren: ()=>import('../HomePages/user/user.module').then(m=>m.UserPageModule),
        canActivate: [UserGuard],
      },
      {
        path: 'post',
        loadChildren: ()=> import('../HomePages/home/home.module').then(m=>m.HomePageModule),
        canActivate: [UserGuard],
      },
      {
        path: '',
        redirectTo: '/home/post',
        pathMatch: 'full'
      }
    ]
  }, 
  {
    path: '',
    redirectTo: '/home/post',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule implements OnInit {
  constructor() {}
  ngOnInit() {
    
  }
}
