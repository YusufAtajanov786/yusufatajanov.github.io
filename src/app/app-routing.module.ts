import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizCreationComponent } from './quiz-creation/quiz-creation.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: 'result', component: ResultComponent },
  { path: '**', component: QuizCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }