import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ActividadListaComponent } from './actividad-lista/actividad-lista.component';
import { ActividadDetalleComponent } from './actividad-detalle/actividad-detalle.component';
import { ActividadCrearComponent } from './actividad-crear/actividad-crear.component';
import { ActividadEditarComponent } from './actividad-editar/actividad-editar.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,  
        CommonModule, 
        NotfoundComponent, 
        ActividadListaComponent, 
        ActividadDetalleComponent, 
        ActividadCrearComponent, 
        ActividadEditarComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
