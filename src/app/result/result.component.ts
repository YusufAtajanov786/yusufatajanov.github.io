import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { IQuestion } from '../models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  /**
   * 
   */
  questions!:IQuestion[];
  /**
   * 
   */
  answers!:{ [key: string]: string } ;
  /**
   * 
   */
  score:number = 0;


  constructor(
    private quizService:QuizService,
    private router: Router){}

  ngOnInit(): void {
    this.questions = this.quizService.questions;
    this.answers = this.quizService.answers;
    this.calculateScore();
  }

  calculateScore(): void {
    this.questions.forEach( x => {
      if(this.answers[x.question] === x.correct_answer) this.score++;
    })
  }

  isCorrectAns(key:string, answer:string, correctAns:string):string{
    
    let color = "white";

    if(this.answers[key] === answer){
        color =  'red';
    }

    if(answer == correctAns)
        color =  'green';

    return color;
  }

  onCreateNewClicked(){
    this.router.navigate(['/']);
  }

  getScore(): number {
    return this.score;
  }

  getScoreColor(): string {
    if (this.score <= 1) {
      return 'red';
    } else if (this.score <= 3) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}
