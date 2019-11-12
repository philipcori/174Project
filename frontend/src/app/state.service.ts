import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

// Google's login API namespace
declare var gapi:any;

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public gapi = null;
  public loggedInUser = null;
  public userAuthToken = null;
  public userDisplayName = "empty";
  public userEmail = null;

  constructor(
    private router: Router
  ) { }

  login(loggedInUser:any){
    this.loggedInUser = loggedInUser;
    this.userAuthToken = loggedInUser.getAuthResponse().id_token;
    this.userDisplayName = loggedInUser.getBasicProfile().getName();
    this.userEmail = loggedInUser.getBasicProfile().getEmail();
  }

  logout(){
    gapi.auth2.getAuthInstance().disconnect();
    this.loggedInUser = null;
    this.userAuthToken = null;
    this.userDisplayName = "empty";
    this.userEmail = null;
  
  }


}
