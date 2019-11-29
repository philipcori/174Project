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

  ngOnInit() {
  }

  uploadFile(file:File){
    this.dataTransferService.uploadFile(file);
  }

  clickSend(){
    this.dataTransferService.sendSurvey();
  }

  clickLogout(){
    this.stateService.logout();
    this.router.navigate(["login"]);
  }
}
