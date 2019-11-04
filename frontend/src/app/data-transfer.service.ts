import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaceSource } from 'webpack-sources';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(private http: HttpClient) { }

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
    return this.http.get('/api/results');
  }
}
