import { Component, OnInit } from '@angular/core';
import { Resp } from 'src/app/models/Resp';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public api:ApiService,
    public alert:AlertService
  ) { }

  ngOnInit() {
  }

  login(username:string,password:string){
    this.api.takeToken(username,password).subscribe((x:any)=>{
      localStorage.setItem("token",x.access_token);
      localStorage.setItem("uid",x.uId);
      localStorage.setItem("username",x.username);
      localStorage.setItem("roles",x.userRoles);
      location.href="/";
    },err=> {
      var r:Resp = new Resp();
      r.job = false;
      r.message = "Kullanıcı Adı veya Parola Geçersizdir!";
      this.alert.useAlert(r);
    })
  }

}
