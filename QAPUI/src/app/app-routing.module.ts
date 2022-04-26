import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminQuestionsComponent } from './components/admin/admin-questions/admin-questions.component';
import { AdminWritersComponent } from './components/admin/admin-writers/admin-writers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'question/:qId', 
    component: QuestionComponent
  },
  {
    path: 'admin/writers', 
    component: AdminWritersComponent,
    canActivate: [AuthGuard],
    data:{
      roles:['admin'],
      back:'/login'
    }
  }, 
  {
    path: 'admin/questions', 
    component: AdminQuestionsComponent,
    canActivate: [AuthGuard],
    data:{
      roles:['admin'],
      back:'/login'
    }
  },
  {
    path: 'myquestions', 
    component: MyQuestionsComponent
  },
  {
    path: 'questions', 
    component: HomeComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
  ]
})
export class AppRoutingModule { }
