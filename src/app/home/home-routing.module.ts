import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'search',
        loadChildren: ()=>import('../HomePages/search/search.module').then((m)=>m.SearchPageModule)
      }, 
      {
        path: 'user',
        loadChildren: ()=>import('../HomePages/user/user.module').then(m=>m.UserPageModule)
      },
      {
        path: 'post',
        loadChildren: ()=> import('../HomePages/home/home.module').then(m=>m.HomePageModule)
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
export class HomePageRoutingModule {}
