import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonacionesListComponent } from './donaciones-list/donaciones-list.component';
import { DonacionesDetailComponent } from './donaciones-detail/donaciones-detail.component';
import { DonacionesCreateComponent } from './donaciones-create/donaciones-create.component';
import { DonacionesEditComponent } from './donaciones-edit/donaciones-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DonacionesListComponent,
    DonacionesDetailComponent,
    DonacionesCreateComponent,
    DonacionesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
