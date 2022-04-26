import { Component, OnInit } from '@angular/core';
import { Questions } from 'src/app/models/Questions';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions:Questions[];

  constructor(
    public apiService:ApiService
  ) { }

  ngOnInit() {
    this.questionList();
  }
  
  questionList(){
    this.apiService.questionsList().subscribe((q:Questions[])=>{
      this.questions = q;
    })
  }
  
}
