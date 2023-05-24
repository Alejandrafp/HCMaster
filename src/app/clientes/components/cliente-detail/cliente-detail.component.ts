import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { cliente } from '../../api/cliente';

@Component({
  selector: 'cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss']
})
export class clienteDetailComponent implements OnInit {
  @Input()  cliente: cliente = {};
  submitted: boolean = false;
  statuses: any[] = [];
  @Input() clienteDialog :boolean  = false;
  @Output() clienteDialogChange = new EventEmitter<boolean>();
  ngOnInit() {

   }

  changeDialogState(value:boolean){
    this.clienteDialog = value;
    this.clienteDialogChange.emit(this.clienteDialog);
  }

  hideDialog() {
    this.changeDialogState(false);
    this.submitted = false;
  }

  savecliente() {
    this.submitted = true;

  }
}
