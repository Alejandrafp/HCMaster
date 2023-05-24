import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { clientes } from '../../api/clientes';

@Component({
  selector: 'clientes-detail',
  templateUrl: './clientes-detail.component.html',
  styleUrls: ['./clientes-detail.component.scss']
})
export class clientesDetailComponent implements OnInit {
  @Input()  clientes: clientes = {};
  submitted: boolean = false;
  statuses: any[] = [];
  @Input() clientesDialog :boolean  = false;
  @Output() clientesDialogChange = new EventEmitter<boolean>();
  ngOnInit() {

   }

  changeDialogState(value:boolean){
    this.clientesDialog = value;
    this.clientesDialogChange.emit(this.clientesDialog);
  }

  hideDialog() {
    this.changeDialogState(false);
    this.submitted = false;
  }

  saveclientes() {
    this.submitted = true;

  }
}
