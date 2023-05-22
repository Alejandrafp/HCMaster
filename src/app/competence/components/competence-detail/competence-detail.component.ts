import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { Competence } from '../../api/competence';

@Component({
  selector: 'competence-detail',
  templateUrl: './competence-detail.component.html',
  styleUrls: ['./competence-detail.component.scss']
})
export class CompetenceDetailComponent implements OnInit {
  @Input()  competence: Competence = {};
  submitted: boolean = false;
  statuses: any[] = [];
  @Input() competenceDialog :boolean  = false;
  @Output() competenceDialogChange = new EventEmitter<boolean>();
  ngOnInit() {

   }

  changeDialogState(value:boolean){
    this.competenceDialog = value;
    this.competenceDialogChange.emit(this.competenceDialog);
  }

  hideDialog() {
    this.changeDialogState(false);
    this.submitted = false;
  }

  savecompetence() {
    this.submitted = true;

  }
}
