import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { clienteRoutingModule } from './cliente-routing.module';
import { clienteComponent } from './pages/cliente/cliente.component';

import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { clienteDetailComponent } from './components/cliente-detail/cliente-detail.component';
import { clienteService } from './Service/cliente.service';

@NgModule({
  declarations: [
    clienteComponent,
    clienteDetailComponent
  ],
  imports: [
    CommonModule,
    clienteRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule
  ],
  providers: [MessageService,clienteService]
})
export class clienteModule { }
