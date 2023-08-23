export interface QuestionData {
    is_correct: boolean;
    stimulus: string;
    order: number;
    user_answers: never[];
    feedback: string;
}
  
export interface RoundData {
    round_title: string;
    order: number;
    questions: QuestionData[];
}
  
export interface Activity {
    activity_name: string;
    order: number;
    questions: (QuestionData | RoundData)[];
}
  