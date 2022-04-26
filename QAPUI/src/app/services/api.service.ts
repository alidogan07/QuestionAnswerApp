import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comments } from '../models/Comments';
import { Questions } from '../models/Questions';
import { Resp} from '../models/Resp';
import { Writer } from '../models/Writers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "http://localhost:64417/api";
  constructor(
    public http: HttpClient
  ) { }


  /* Oturum İşlemleri Başlangıç */

  takeToken(username:string,password:string){
    var data="username="+username+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"/token",data,{headers:reqHeader});
  }

  checkLogin(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  checkRoles(roles:string[]){
    var resp:boolean = false;

    var userRoles:string[]=JSON.parse(localStorage.getItem("roles"));

    if(userRoles){
      roles.forEach(element => {
        if(userRoles.indexOf(element) > -1){
          resp = true;
          return false;
        }else{
          return false;
        }
      });
    }

    return resp;
  }

  /* Oturum İşlemleri Bitiş */

  /* API */

  questionsList(){
    return this.http.get<Questions[]>(this.apiUrl + "/questionslist");
  }

  questionById(qId:number){
    return this.http.get<Questions>(this.apiUrl + "/questionbyid/" + qId);
  }

  addQuestion(ques : Questions){
    return this.http.post<Resp>(this.apiUrl + "/addquestion",ques);
  }

  editQuestion(ques : Questions){
    return this.http.put<Resp>(this.apiUrl + "/editquestion",ques);
  }

  deleteQuestion(qId: number){
    return this.http.delete<Resp>(this.apiUrl + "/deletequestion/" + qId);
  }

  writerList(){
    return this.http.get<Writer[]>(this.apiUrl + "/writerlist");
  }

  writerById(uId:string){
    return this.http.get<Writer>(this.apiUrl + "/writerbyid/" + uId);
  }

  addWriter(writer:Writer){
    return this.http.post<Resp>(this.apiUrl + "/addwriter",writer);
  }

  editWriter(writer:Writer){
    return this.http.put<Resp>(this.apiUrl + "/editwriter",writer);
  }

  deleteWriter(uId:string){
    return this.http.delete<Resp>(this.apiUrl + "/deletewriter/" + uId);
  }

  commentsList(){
    return this.http.get<Comments[]>(this.apiUrl + "/commentslist");
  }

  commentQuestionById(qId:number){
    return this.http.get<Comments[]>(this.apiUrl + "/commentslistbyquestionid/" + qId);
  }

  addComment(comment:Comments){
    return this.http.post<Resp>(this.apiUrl + "/addcomment",comment);
  }

  editComment(comment:Comments){
    return this.http.put<Resp>(this.apiUrl + "/editcomment",comment);
  }

  deleteComment(cId:number){
    return this.http.delete<Resp>(this.apiUrl + "/deletecomment/" + cId);
  }

}
