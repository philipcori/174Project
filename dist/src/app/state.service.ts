import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

// Google's login API namespace
declare var gapi:any;

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  public justLoggedOut: boolean = false;

  login(loggedInUser:any){
    // this.loggedInUser = loggedInUser;
    // this.userAuthToken = loggedInUser.getAuthResponse().id_token;
    // this.userDisplayName = loggedInUser.getBasicProfile().getName();
    // this.userEmail = loggedInUser.getBasicProfile().getEmail();
    this.cookieService.set('loggedInUser', loggedInUser, 1);
    this.cookieService.set('userAuthToken', loggedInUser.getAuthResponse().id_token);
    this.cookieService.set('userDisplayName', loggedInUser.getBasicProfile().getName());
    this.cookieService.set('userEmail', loggedInUser.getBasicProfile().getEmail());

  }

  logout(){
    this.cookieService.deleteAll();
    gapi.load('auth2', function() {
      gapi.auth2.init();
      gapi.auth2.getAuthInstance().disconnect()
    });
    this.justLoggedOut = true;
    // this.loggedInUser = null;
    // this.userAuthToken = null;
    // this.userDisplayName = "";
    // this.userEmail = null;
    // this.userType = null;
    // this.selectedSectionID = null; 
    // this.selectedSectionSubject = null;
    // this.selectedCatalogNum = null; 
  }

  removeSectionSelection(){
    // this.selectedSectionID = null;
    // this.selectedSectionSubject = null;
    // this.selectedCatalogNum = null;
    this.cookieService.delete("selectedSectionID");
    this.cookieService.delete("selectedSectionSubject");
    this.cookieService.delete("selectedCatalogNum");
  }

}
