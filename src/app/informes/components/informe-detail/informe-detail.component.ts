import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { informe } from '../../api/informe';

@Component({
  selector: 'informe-detail',
  templateUrl: './informe-detail.component.html',
  styleUrls: ['./informe-detail.component.scss']
})
export class informeDetailComponent implements OnInit {
  @Input()  informe: informe = {};
  submitted: boolean = false;
  statuses: any[] = [];
  @Input() informeDialog :boolean  = false;
  @Output() informeDialogChange = new EventEmitter<boolean>();
  ngOnInit() {

   }

  changeDialogState(value:boolean){
    this.informeDialog = value;
    this.informeDialogChange.emit(this.informeDialog);
  }

  hideDialog() {
    this.changeDialogState(false);
    this.submitted = false;
  }

  saveinforme() {
    this.submitted = true;

  }
}
