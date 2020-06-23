import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SiteComponent } from './pages/site/site.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

// icon modules
import { FeatherModule } from 'angular-feather';
import { Search, ChevronDown, Mail } from 'angular-feather/icons';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SiteComponent,
    SearchFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FeatherModule.pick({ Search, ChevronDown, Mail }),
  ],
  exports: [FeatherModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
