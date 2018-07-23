import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 
 questionsAdmin:any;
 courses:any;
 options=[];
 finalOptions=[];
 ans=[];
 qNo:number;
 question:string;
 courseName:string;
  constructor(private router : Router,private quizService:QuizService) { }
  isEditable  = false;
  myVar = false;
  selectedOption:any;
  ngOnInit() {

    this.quizService.getCourses().subscribe(
        (data: any) => {
        console.log("data",data);
         this.courses=data;
        }
      );

  }
 
  questions = [
    { sno :'' , question :'', correct : '' }
  ]
   
  public edit(question:any){
   
   this.isEditable=true;
  
  }
  
  public save(question:any){
  this.isEditable=false;
     this.quizService.updateQuestionsAdmin(question).subscribe(
        (data: any) => {
           this.router.navigate(['/questions']);
        }
      );
  }

   public del(qid:number){
   this.isEditable=false;
     this.quizService.delQuestionsAdmin(qid).subscribe(
        (data: any) => {
         window.location.reload();

        }
      );
  }
  viewQues(){
  console.log(this.myVar, this.selectedOption);

  if( this.selectedOption!=undefined){
    this.quizService.getQuestionsAdmin(this.selectedOption).subscribe(
        (data: any) => {
        this.myVar=true;
        console.log("data",data);
          this.questionsAdmin = data;
          console.log(this.questionsAdmin,"data");
        }
      );
  }
  }

 addQues(question:string,answer:string,course:string,option1:string,option2:string,option3:string,option4:string){
console.log(question,answer,course);
  this.isEditable=false;
     

  }

 OptionNumber(qNo:number,question:string,num:number,courseid:number){
  for(var i=0;i<num;i++)
  {
    var body={value:i};
    this.options.push(body);
  }
    this.qNo=qNo;
    this.question=question;
    this.selectedOption=courseid;
    this.courseName=this.courses[courseid-1].course_name;
    console.log(this.options);
    $(document).ready(function(){
      $('#quesModal').hide("slow");
      $('#Optmodal').show("slow");
  });
 }
 optionsGiven(options:any)
 {
    console.log(options,this.ans);
    $(document).ready(function(){
      $('#Optmodal').hide("slow");
  });
  for(var i=0;i<this.options.length;i++){
    this.finalOptions[i]=this.options[i].value;
  }
  var body=[{
    qNo:this.qNo,
    question:this.question,
    options:this.finalOptions,
    answers:this.ans,
    courseId:this.selectedOption,
    courseName:this.courseName
  }]
   this.quizService.addQuestionsAdmin(body).subscribe(
        (data: any) => {
         window.location.reload();

        }
      );
  
 }
 
  checkValue(event,i){
  
  if(event.target.checked){
    
     this.ans[i]=this.options[i].value;
  }
  else{
     this.ans.splice(i, 1);;
  }
  console.log(this.ans);
  }

}
