import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Questions } from 'src/app/models/Questions';

interface Category{
  name: string;
}

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['./questions-dialog.component.css']
})
export class QuestionsDialogComponent implements OnInit {

  dialogTitle: string;
  newQuestion:Questions;
  job:string;
  frm:FormGroup;
  category:string;

  
  categories: Category[] = [
    {name: 'Angular'},
    {name: 'Web'},
    {name: 'Yapay Zeka'},
    {name: 'Veri Madenciliği'},
    {name: 'Block Chain'},
    {name: 'Siber Güvenlik'},
  ];

  constructor(
    public dialogRef:MatDialogRef<QuestionsDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {  
    this.job = data.job;
    if(this.job == "add"){
      this.dialogTitle="Soru Ekle";
      this.newQuestion=new Questions();
      
    }else if(this.job == "edit"){
      this.dialogTitle="Soru Düzenle";
      this.newQuestion=data.question;
      this.category=data.question.category;
    }
    else if(this.job == "detail"){
      this.dialogTitle="Soru Önizle";
      this.newQuestion=data.question;
    }
    this.frm = this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    return this.frmBuild.group({
      qTitle: this.newQuestion.qTitle,
      qDesc: this.newQuestion.qDesc,
      category: this.category,
      username:localStorage.getItem("username"),
      uid:localStorage.getItem("uid"),
      date:new Date(),
    })
  }

}
