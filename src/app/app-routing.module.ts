import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SiteComponent } from './pages/site/site.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'site', component: SiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
