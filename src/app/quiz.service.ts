import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from './models/categories';
import { IQuestion, IQuestions } from './models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly baseUrl = 'https://opentdb.com/';
  
  public questions!:IQuestion[];
  public answers!:{ [key: string]: string } ;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategories> {
    const path = "api_category.php";
    const url = `${this.baseUrl}${path}`;
    return this.http.get<ICategories>(url);
  }

  getQuestions(query:string): Observable<IQuestions> {
    const url = `${this.baseUrl}${query}`;
    return this.http.get<IQuestions>(url);
  }

}
