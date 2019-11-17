import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/state.service';
import { DataTransferService } from 'src/app/data-transfer.service';
import { HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

// User types
const userStudent: string = "student";
const userProfessor:  string = "professor";

@Component({
  selector: 'app-sections-homepage',
  templateUrl: './sections-homepage.component.html',
  styleUrls: ['./sections-homepage.component.css']
})
export class SectionsHomepageComponent implements OnInit {

  constructor(
    public stateService: StateService,
    private dataTransferService: DataTransferService,
    private router:Router
  ) { }
  sectionsArray: any = null;
  /*
  sectionData{
    section_id: number;
    course_subject: string;
    catalog_num: string;
    course_title: string;
  }
  */

  ngOnInit() {
    if(this.stateService.userType === userStudent){
      this.dataTransferService.getStudentSections().subscribe((response)=>{
        this.sectionsArray = response;
      });
    }
    else if(this.stateService.userType === userProfessor){
      this.dataTransferService.getProfessorSections().subscribe((response)=>{
        this.sectionsArray = response;
      });
    }
    // // TODO - Testing
    // else{
    //   this.dataTransferService.getProfessorSections().subscribe((response)=>{
    //     this.sectionsArray = response;
    //     console.log(this.sectionsArray)
    //   });
    // }
  }
  
  clickSection(sectionID){
    this.stateService.selectedSectionID = sectionID;
    
    if(this.stateService.userType === userStudent){
      this.router.navigate(["survey-page"]);
    }
    else if(this.stateService.userType === userProfessor){
      this.router.navigate(["results-page"]);
    }
    // FOR TESTING
    else{
      this.router.navigate(["results-page"]);
    }
  }



}
