import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VoluntariosComponent
  ],
  imports: [
    HttpClientModule,FormsModule, BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
