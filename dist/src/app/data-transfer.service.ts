import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private datePipe: DatePipe
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

  sendSurveyDates(sendDate: Date, endDate: Date){
    let dateType = "MM/dd/yyyy"
    
    let request:any = {
      send_date: this.datePipe.transform(sendDate, dateType),
      end_date: this.datePipe.transform(endDate, dateType)
    };

    console.log(request)
    this.http.post('/api/schedule_send', request).subscribe((response) => {
      console.log('response received is ', response);
    })
  }

  submitSurvey(submission){
    submission["student_email"] = this.cookieService.get('userEmail');
    submission["section_id"] = this.cookieService.get('selectedSectionID');
    submission["auth_token"] = this.cookieService.get('userAuthToken');

    return this.http.post('/api/submit', submission, { responseType: 'text' });
  }

  getResults(){
    let submission = {
      section_id: this.cookieService.get("selectedSectionID")
    }
    return this.http.post('/api/results', submission);
  }

  redirect(): Observable<any>{
    let request = {
      email: this.cookieService.get('userEmail'),
      access_token: this.cookieService.get('userAuthToken')
    }

    return this.http.post('/api/redirect', request, { responseType: 'json' });
  }

  getStudentSections(){
    let request = {
      student_email: this.cookieService.get('userEmail'),
      access_token: this.cookieService.get('userAuthToken')
    }
    return this.http.post('/api/get_student_sections', request, { responseType: 'json' });
  }

  getProfessorSections(){
    let request = {
      prof_email: this.cookieService.get('userEmail'),
      access_token: this.cookieService.get('userAuthToken')
    }

    return this.http.post('/api/get_professor_sections', request, { responseType: 'json' });
  }
}
