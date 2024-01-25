import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  url: string = 'http://localhost:5039/api/person';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  submitForm() {
    const formData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post(this.url, formData, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Person added successfully:', response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding person:', error);

        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error occurred:', error.error.message);
        } else {
          console.error(`Server-side error ${error.status}: ${error.error}`);
        }
      }
    );
  }
}
