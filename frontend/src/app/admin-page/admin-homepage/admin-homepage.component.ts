import { Component, OnInit } from '@angular/core';
import { DataTransferService } from "src/app/data-transfer.service"

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(private dataTransferService: DataTransferService) { }

  ngOnInit() {
  }

  uploadFile(file:File){
    this.dataTransferService.uploadFile(file);
  }

  clickSend(){
    this.dataTransferService.sendSurvey();
  }
}
