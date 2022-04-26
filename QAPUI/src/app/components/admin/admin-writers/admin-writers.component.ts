import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Resp } from 'src/app/models/Resp';
import { Writer } from 'src/app/models/Writers';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { WritersDialogComponent } from '../../dialogs/writers-dialog/writers-dialog.component';

@Component({
  selector: 'app-admin-writers',
  templateUrl: './admin-writers.component.html',
  styleUrls: ['./admin-writers.component.css']
})
export class AdminWritersComponent implements OnInit {

  writers:Writer[];
  dataSource: any;
  displayedColumns=["username","mail","role","password","detail"]
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<WritersDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiService:ApiService,
    public matDialog:MatDialog,
    public alertService:AlertService
  ) { }

  ngOnInit() {
    this.writerList();
  }

  writerList(){
    this.apiService.writerList().subscribe((d:Writer[])=>{
      this.writers = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  addWriter(){
    var newWriter:Writer = new Writer();
    this.dialogRef = this.matDialog.open(WritersDialogComponent,{
      width:'500px',
      data:{
        writer:newWriter,
        job: 'add'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.addWriter(d).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.writerList();
          }
        });
      }
    });
  }

  editWriter(writer:Writer){
    this.dialogRef = this.matDialog.open(WritersDialogComponent,{
      width:'500px',
      data:{
        writer:writer,
        job: 'edit'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        writer.mail = d.mail;
        writer.password = d.password;
        writer.role = d.role;
        writer.username = d.username;
        this.apiService.editWriter(writer).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.writerList();
          }
        });
      }
    });
  }

  deleteWriter(writer:Writer){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj ="'" + writer.username + "' Adlı Kullanıcı Silinecektir Onaylıyor Musunuz?"

    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if(d){
        this.apiService.deleteWriter(writer.uId).subscribe((r:Resp)=>{
          this.alertService.useAlert(r);
          if(r.job){
            this.writerList();
          }
        });
      }
    });
  }

}
