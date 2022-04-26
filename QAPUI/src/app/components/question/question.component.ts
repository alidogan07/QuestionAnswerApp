import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/Comments';
import { Questions } from 'src/app/models/Questions';
import { Resp } from 'src/app/models/Resp';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  qId:number;
  question:Questions;
  comments:Comments[];
  uId:string=localStorage.getItem("uid");
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>



  constructor(
    public apiService:ApiService,
    public route:ActivatedRoute,
    public alertService:AlertService,
    public matDialog:MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['qId']){
        this.qId = p['qId'];
        this.questionById();
        this.questionCommentList();
      }
    })
  }

  questionById(){
    this.apiService.questionById(this.qId).subscribe((q:Questions)=>{
      this.question = q;
    })
  }

  questionCommentList(){
    this.apiService.commentQuestionById(this.qId).subscribe((d:Comments[])=>{
      this.comments = d;
    })
  }

  addComment(commentText:string){
    var comment:Comments = new Comments();
    comment.qid = this.qId;
    comment.uid = this.uId;
    comment.comment = commentText;
    comment.date = new Date();

    this.apiService.addComment(comment).subscribe((d:Resp)=>{
      if(d.job){
        this.questionCommentList();
      }
    })
  }

  editComment(comment : Comments){
    this.apiService.editComment(comment).subscribe((d:Resp)=>{
      if(d.job){
        this.questionCommentList();
      }
    })
  } 
  
  deleteComment(comment:Comments){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj ="'" + comment.comment + "' Yorumu Silinecektir Onaylıyor Musunuz?"

    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.deleteComment(comment.cId).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.questionCommentList();
          }
        });
      }
    });
  }
}

