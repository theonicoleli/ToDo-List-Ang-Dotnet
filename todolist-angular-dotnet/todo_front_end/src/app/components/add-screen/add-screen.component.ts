import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Do } from '../../../assets/models/Do';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.css']
})
export class AddScreenComponent {
  @Output() addDo = new EventEmitter<Do>();

  doForm: FormGroup;
  personId: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.doForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required]
    });

    const storedPersonData = localStorage.getItem('currentPerson');

    if (storedPersonData) {
      const currentPerson = JSON.parse(storedPersonData);
      this.personId = currentPerson.personId;
    }
  }

  onSubmit() {
    if (this.doForm.valid && this.personId) {
      const newDo = new Do(
        0,
        this.doForm.value.title,
        this.doForm.value.description,
        this.doForm.value.date
      );

      this.http.post(`http://localhost:5039/api/Do/${this.personId}`, newDo, { responseType: 'text' as 'json' }).subscribe(
        (response: any) => {
          console.log('POST response:', response);
          this.addDo.emit(newDo);
          this.doForm.reset();
          
          this.router.navigate(['/menu']);
        },
        (error: any) => {
          console.error('Error posting data:', error);
        }
      );
    }
  }
}
