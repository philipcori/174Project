import { Component, OnInit } from '@angular/core';
import { DataTransferService } from "src/app/data-transfer.service"
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-results-homepage',
  templateUrl: './results-homepage.component.html',
  styleUrls: ['./results-homepage.component.css']
})
export class ResultsHomepageComponent implements OnInit {
  qstTypeHours = "hours";
  qstTypeScale = "scale";
  qstTypeResponse = "response";
  currentPageIndex = 0;

  questionPages = [
    {
      title:"Learning from Labs",
      questions:[
        {
          label: "q_1a",
          type: "scale",
          text: "The labs helped me understand the lecture material.",
          answer: null
        },
        {
          label: "q_1b",
          type: "scale",
          text: "The labs taught me new skills.",
          answer: null
        },
        {
          label: "q_1c",
          type: "scale",
          text: "The labs taught me to think creatively.",
          answer: null
        },
        {
          label: "q_1d",
          type: "scale",
          text: "I would be able to repeat the labs without help.",
          answer: null
        },
        {
          label: "q_1e",
          type: "response",
          text: "What was your favorite aspect of the lab?",
          answer: null
        },
        {
          label: "q_1f",
          type: "response",
          text: "What about the lab would you like to see improved?",
          answer: null
      }
      ]
    },
    {
      title:"Lab Instructor",
      questions:[
        {
          label: "q_2a",
          type: "scale",
          text: "The lab instructor was supportive.",
          answer: null
        },
        {
          label: "q_2b",
          type: "scale",
          text: "The lab instructor was approachable.",
          answer: null
        },
        {
          label: "q_2c",
          type: "scale",
          text: "The lab instructor was able to answer my questions.",
          answer: null
        },
        {
          label: "q_2d",
          type: "scale",
          text: "The lab instructor helped me reach a clear understanding of key concepts.",
          answer: null
        },
        {
          label: "q_2e",
          type: "scale",
          text: "The lab instructor fostered a mutually respectful learning environment.",
          answer: null
        },
        {
          label: "q_2f",
          type: "response",
          text: "What, if anything, could the lab instructor do to improve the experience?",
          answer: null
        }
      ]
    },
    {
      title:"Lab Space and Equipment",
      questions:[
        {
          label: "q_3a",
          type: "scale",
          text: "The amount of lab equipment was sufficient.",
          answer: null
        },
        {
          label: "q_3b",
          type: "scale",
          text: "The available space was sufficient for the lab activities.",
          answer: null
        },
        {
          label: "q_3c",
          type: "scale",
          text: "If lab equipment or setups were not functioning properly, adequate support was available to rectify the situation.",
          answer: null
        },
        {
          label: "q_3d",
          type: "response",
          text: "What, if anything, could improve lab space and equipment?",
          answer: null
        }
      ]
    },
    {
      title:"Time Required to Complete Labs",
      questions:[
        {
          label: "q_4a",
          type: "hours",
          text: "On average, the approximate number of hours completing a lab was",
          answer: null
        },
        {
          label: "q_4b",
          type: "hours",
          text: "How many hours did you spend preparing for the lab?",
          answer: null
        },
        {
          label: "q_4c",
          type: "hours",
          text: "How many hours did you spend writing lab reports outside the designated lab period?",
          answer: null
        }
      ]
    },
    {
      title:"Lecture Section Instructor",
      questions:[
        {
          label: "q_5a",
          type: "response",
          text: "What feedback would you give the lecture section instructor (not the lab TA) about the labs?",
          answer: null
        }
      ]
    }
  ]

  surveyData = null;


  constructor(
    public cookieService: CookieService,
    private dataTransferService: DataTransferService,
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataTransferService.getResults().subscribe((response)=>{
      this.surveyData = response;
      console.log(this.surveyData)
    });
  }

  changePage(increment: number){
    if(this.currentPageIndex < this.questionPages.length-1 && increment > 0
      || this.currentPageIndex > 0 && increment < 0
    ){
      this.currentPageIndex += increment;
    }
  }

  getAverage(question){
    let questionSum = 0; 
    this.surveyData.forEach(surveyResponse => {
      questionSum += surveyResponse[question.label];
    });
    return questionSum/this.surveyData.length;
  }

  clickBack(){
    this.router.navigate(["/sections-page"]);
  }
  clickLogout(){
    this.stateService.logout();
    this.router.navigate(["login"]);
  }
}
