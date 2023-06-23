import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCreationComponent } from './quiz-creation/quiz-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { HtmlEntityPipe } from './share/html-entity.pipe';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizCreationComponent,
    ResultComponent,
    HtmlEntityPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
