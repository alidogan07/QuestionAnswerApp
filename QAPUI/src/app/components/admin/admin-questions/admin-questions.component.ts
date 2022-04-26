import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Questions } from 'src/app/models/Questions';
import { Resp } from 'src/app/models/Resp';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { QuestionsDialogComponent } from '../../dialogs/questions-dialog/questions-dialog.component';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

  questions:Questions[];
  dataSource: any;
  displayedColumns=["qTitle","category","username","date","detail"]
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<QuestionsDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alertService:AlertService
  ) { }

  ngOnInit() {
    this.questionList();
  }

  questionList(){
    this.apiService.questionsList().subscribe((d:Questions[])=>{
      this.questions = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  addQuestion(){
    var newQuestion:Questions = new Questions();

    this.dialogRef = this.matDialog.open(QuestionsDialogComponent,{
      width:'600px',
      data:{
        question:newQuestion,
        job: 'add'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.addQuestion(d).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.questionList();
          }
        });
      }
      console.log(d);
    });
  }

  editQuestion(question:Questions){
    this.dialogRef = this.matDialog.open(QuestionsDialogComponent,{
      width:'600px',
      data:{
        question:question,
        job: 'edit'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        question.qTitle = d.qTitle;
        question.qDesc = d.qDesc;
        question.category = d.category;
        question.date = d.date;
        this.apiService.editQuestion(question).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.questionList();
          }
        });
      }
    });
  }

  deleteQuestion(question:Questions){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj ="'" + question.qTitle + "' Sorusu Silinecektir Onaylıyor Musunuz?"

    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.deleteQuestion(question.qId).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.questionList();
          }
        });
      }
    });
  }

  detailQuestion(question:Questions){
    this.dialogRef = this.matDialog.open(QuestionsDialogComponent,{
      width:'600px',
      data:{
        question:question,
        job: 'detail'
      }
    });
  }

}
