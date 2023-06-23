export interface IQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
  
export interface IQuestions {
    response_code: number;
    results: IQuestion[];
}
