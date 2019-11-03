import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    this.http.post('/upload', formData).subscribe((response) => {
      console.log('response received is ', response);
  })
  }
}
