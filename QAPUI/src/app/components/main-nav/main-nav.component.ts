import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  username:string;
  role = localStorage.getItem("roles");

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiService : ApiService
  ) {
  }

  ngOnInit(): void {
    if(this.apiService.checkLogin){
      this.username = localStorage.getItem("username");
    }
  }

  isAdmin(){
    if(this.role == "admin"){
      return true;
    }else{
      return false;
    }  
  }

  logOut(){
    localStorage.clear();
    location.href = "/";
  }      

}
