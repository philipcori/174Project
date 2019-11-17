import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) { }

  uploadFile(file:File){
    console.log(file);

    let formData = new FormData();
    formData.append("uploadedFile", file[0], file[0].name);
    console.log(formData)

    this.http.post('/api/upload', formData).subscribe((response) => {
      console.log('response received is ', response);
    })
  }

  sendSurvey(){
    let request:any = null;
    this.http.post('/api/schedule', request).subscribe((response) => {
      console.log('response received is ', response);
    })
  }

  submitSurvey(submission){
    submission["student_email"] = this.stateService.userEmail;
    submission["section_id"] = this.stateService.selectedSectionID;
    submission["auth_token"] = this.stateService.userAuthToken;

    return this.http.post('/api/submit', submission, { responseType: 'text' });
  }

  getResults(){
    let submission = {
      section_id: this.stateService.selectedSectionID
    }
    return this.http.post('/api/results', submission);
  }

  redirect(): Observable<any>{
    let request = {
      email: this.stateService.userEmail,
      access_token: this.stateService.userAuthToken
    }

    return this.http.post('/api/redirect', request, { responseType: 'json' });
  }

  getStudentSections(){
    let request = {
      student_email: this.stateService.userEmail,
      access_token: this.stateService.userAuthToken
    }
    return this.http.post('/api/get_student_sections', request, { responseType: 'json' });
  }

  getProfessorSections(){
    let request = {
      prof_email: "Kukzenski@gmail.com",//this.stateService.userEmail,
      access_token: this.stateService.userAuthToken
    }

    return this.http.post('/api/get_professor_sections', request, { responseType: 'json' });
  }
}
