import { TypeofExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import quiz_questions  from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = ''

  questions:any
  questionSelected:any 

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  photo:string = ''
  constructor() {
    
  }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)

    }
  }

  PlayerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    console.log(this.answers)

    // this.questionIndex = this.questionIndex + 1
  }

  async nextStep(){
    this.questionIndex+= 1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }
    else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]

      console.log(finalAnswer)
      if(finalAnswer == 'B'){
        this.photo = "assets/imgs/Herois.jpg"
      }
      else{
        this.photo = "assets/imgs/Vilões.jpeg"
      }
    }
    // Verificar a opção ganhadora
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
      arr.filter(item => item === previous).length > 
      arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })

    return result 
  }
}
