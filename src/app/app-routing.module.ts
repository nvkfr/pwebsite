import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  /*{ path: '', redirectTo: '/accueil', pathMatch: 'full'},*/
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:newsId', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
