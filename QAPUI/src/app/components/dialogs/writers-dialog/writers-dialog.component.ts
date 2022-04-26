import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Writer } from 'src/app/models/Writers';

interface Roles{
  name: string;
  id: number;
}

@Component({
  selector: 'app-writers-dialog',
  templateUrl: './writers-dialog.component.html',
  styleUrls: ['./writers-dialog.component.css']
})
export class WritersDialogComponent implements OnInit {

  dialogTitle: string;
  newWriter:Writer;
  job:string;
  frm:FormGroup;
  role:number;

  
  roles: Roles[] = [
    {name: 'Admin', id:1},
    {name: 'Yazar', id:2},
  ]

  constructor(
    public dialogRef:MatDialogRef<WritersDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {  
    this.job = data.job;
    if(this.job == "add"){
      this.dialogTitle="Kullanıcı Ekle";
      this.newWriter=new Writer();
      
    }else if(this.job == "edit"){
      this.dialogTitle="Kullanıcı Düzenle";
      this.newWriter=data.writer;
      this.role=data.writer.role;
    }  
    this.frm = this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    return this.frmBuild.group({
      username: this.newWriter.username,
      password: this.newWriter.password,
      mail: this.newWriter.mail,
      role:this.role
    })
  }

}
