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

  submitSurvey(submission){
    this.http.post('/api/submit',submission, { responseType: 'text' }).subscribe((response) => {
      // console.log('response received is ', response);
    })
  }

  getResults(){
    let submission = {
      section_id: "83550"
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
}
