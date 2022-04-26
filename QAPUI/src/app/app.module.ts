import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminQuestionsComponent } from './components/admin/admin-questions/admin-questions.component';
import { AdminWritersComponent } from './components/admin/admin-writers/admin-writers.component';
import { QuestionsDialogComponent } from './components/dialogs/questions-dialog/questions-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { WritersDialogComponent } from './components/dialogs/writers-dialog/writers-dialog.component';
import { SignupComponent } from './components/signup/signup.component';
import { AlertService } from './services/alert.service';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor.service';
import { AdminPipe } from './pipes/admin.pipe';
import { AuthGuard } from './services/AuthGuard';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    MyQuestionsComponent,
    QuestionsComponent,
    SignupComponent,
    QuestionComponent,

    //Admin
    AdminQuestionsComponent,
    AdminWritersComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    QuestionsDialogComponent,
    WritersDialogComponent,

    AdminPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    QuestionsDialogComponent,
    WritersDialogComponent
  ],
  providers: [AlertService,ApiService, AdminPipe,AuthGuard,
  {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
