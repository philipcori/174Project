import { Component, OnInit } from '@angular/core';
import { DataTransferService } from "src/app/data-transfer.service"
import { Router } from '@angular/router';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(
    private dataTransferService: DataTransferService,
    private router: Router,
    private stateService: StateService
  ) { }
  public sendDate: Date = null;
  public endDate: Date = null;
  public minDate: Date = new Date();

  ngOnInit() {
  }

  uploadFile(file:File){
    this.dataTransferService.uploadFile(file);
  }

  clickSend(){
    this.dataTransferService.sendSurvey();
  }


  clickScheduleSend(){
    this.dataTransferService.sendSurveyDates(this.sendDate, this.endDate);
  }

  clickLogout(){
    this.stateService.logout();
    this.router.navigate(["login"]);
  }
}
