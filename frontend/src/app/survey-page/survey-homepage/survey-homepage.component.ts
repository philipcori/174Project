import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-homepage',
  templateUrl: './survey-homepage.component.html',
  styleUrls: ['./survey-homepage.component.css']
})
export class SurveyHomepageComponent implements OnInit {

  currentPageIndex = 0;
  questionPages = [
    {
      title:"Learning from Labs",
      questions:[
        {
          type: "scale",
          text: "The labs helped me understand the lecture material.",
          answer: null
        },
        {
          type: "scale",
          text: "The labs taught me new skills.",
          answer: null
        },
        {
          type: "scale",
          text: "The labs taught me to think creatively.",
          answer: null
        },
        {
          type: "scale",
          text: "I would be able to repeat the labs without help.",
          answer: null
        },
        {
          type: "response",
          text: "What was your favorite aspect of the lab?",
          answer: null
        },
        {
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
          type: "scale",
          text: "The lab instructor was supportive.",
          answer: null
        },
        {
          type: "scale",
          text: "The lab instructor was approachable.",
          answer: null
        },
        {
          type: "scale",
          text: "The lab instructor was able to answer my questions.",
          answer: null
        },
        {
          type: "scale",
          text: "The lab instructor helped me reach a clear understanding of key concepts.",
          answer: null
        },
        {
          type: "scale",
          text: "The lab instructor fostered a mutually respectful learning environment.",
          answer: null
        },
        {
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
          type: "scale",
          text: "The amount of lab equipment was sufficient.",
          answer: null
        },
        {
          type: "scale",
          text: "The available space was sufficient for the lab activities.",
          answer: null
        },
        {
          type: "scale",
          text: "If lab equipment or setups were not functioning properly, adequate support was available to rectify the situation.",
          answer: null
        },
        {
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
          type: "hours",
          text: "On average, the approximate number of hours completing a lab was",
          answer: null
        },
        {
          type: "hours",
          text: "How many hours did you spend preparing for the lab?",
          answer: null
        },
        {
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
          type: "response",
          text: "What feedback would you give the lecture section instructor (not the lab TA) about the labs?",
          answer: null
        }
      ]
    }
  ]

  changePage(increment: number){
    this.currentPageIndex += increment;
  }

  clickSubmit(){

  }

  constructor() { }

  ngOnInit() {
  }

}
