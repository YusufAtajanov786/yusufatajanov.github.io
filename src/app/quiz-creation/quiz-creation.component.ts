import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ICategories, ICategory } from '../models/categories';
import { IQuestion } from '../models/question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {

  /**
   * 
   */
  quizForm!: FormGroup;

  /**
   * 
   */
  categories!: ICategory[];

  /**
   * 
   */
  questions!: IQuestion[];

  /**
   * 
   */
  selectedAnswers: { [key: string]: string } = {};

  /**
   * 
   */
  error: string | null = null;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      categorySelect: ['', Validators.required],
      difficultySelect: ['', Validators.required]
    });

    this.quizService.getCategories()
      .pipe(
        catchError((error) => {
          this.error = 'Failed to load categories. Please try again.';
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.categories = response.trivia_categories;
      });
  }

  public onStartQuiz(): void {
    if (this.quizForm.invalid) {
      return;
    }

    const { categorySelect, difficultySelect } = this.quizForm.value;
    const query: string = `api.php?amount=5&category=${categorySelect}&difficulty=${difficultySelect}&type=multiple`;

    this.quizService.getQuestions(query)
      .pipe(
        debounceTime(200),
        catchError((error) => {
          this.error = 'Failed to load questions. Please try again.';
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.questions = response.results;
        this.shuffleAnswerOptions();
      });
  }

  public shuffleAnswerOptions(): void {
    this.questions.forEach((question) => {
      const len = question.incorrect_answers.length;
      const randomIndex = Math.floor(Math.random() * (len + 1));
      question.incorrect_answers.splice(randomIndex, 0, question.correct_answer);
    });
  }

  public onAnswerClicked(answer: { question: string; answer: string }): void {
    this.selectedAnswers[answer.question] = answer.answer;
  }

  public get isSubmitBtnVisible(): boolean {
    return Object.keys(this.selectedAnswers).length === this.questions?.length && this.questions?.length !== 0;
  }

  public submitQuiz(): void {
    this.quizService.questions = this.questions;
    this.quizService.answers = this.selectedAnswers;
    this.router.navigate(['/result']);
  }
}
