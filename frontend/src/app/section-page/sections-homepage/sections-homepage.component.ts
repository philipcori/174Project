import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-sections-homepage',
  templateUrl: './sections-homepage.component.html',
  styleUrls: ['./sections-homepage.component.css']
})
export class SectionsHomepageComponent implements OnInit {

  constructor(
    public stateService: StateService
  ) { }

  ngOnInit() {
  }

}
