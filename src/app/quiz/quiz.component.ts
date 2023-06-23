import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../models/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  /**
   * 
   */
  @Input() question!:IQuestion;

  /**
   * 
   */
  @Output() answer = new EventEmitter<{question:string,answer:string}>();

  /**
   * 
   */
  selectedAnswer: string | null = null;

  public onAnswerClicked(answer:string): void {
    this.selectedAnswer = answer;
    const ans = {question:this.question.question, answer:answer};
    this.answer.emit(ans);
  }

}
