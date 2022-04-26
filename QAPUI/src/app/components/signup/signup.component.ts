import { Component, OnInit } from '@angular/core';
import { Resp } from 'src/app/models/Resp';
import { Writer } from 'src/app/models/Writers';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    public apiService:ApiService,
    public alertService:AlertService
  ) { }

  ngOnInit() {
  }

  signup(username:string,mail:string,password:string){
    var writer:Writer = new Writer();
    writer.username = username;
    writer.mail = mail;
    writer.password = password;
    writer.role = 2;
    if(writer){
      this.apiService.addWriter(writer).subscribe((r:Resp)=>{
        this.alertService.useAlert(r);
        if(r){
          location.href="/login";
        }
      });
    }
  }
}
