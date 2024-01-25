import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-screen',
  templateUrl: './edit-screen.component.html',
  styleUrls: ['./edit-screen.component.css']
})
export class EditScreenComponent implements OnInit {
  @Input() editDoId: number = 0;
  @Output() addOrUpdateDo = new EventEmitter<Array<string>>();

  personId: number = 0;
  doForm: FormGroup;
  linkGetPersonId: string = 'http://localhost:5039/api/Do/getDo/';

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.editDoId = idParam ? +idParam : 0;
    });

    const getPersonId = this.linkGetPersonId + this.editDoId;

    forkJoin([this.http.get(getPersonId)]).subscribe(
      ([personData]: any) => {
        this.personId = personData.personId;

        if (this.editDoId && this.editDoId !== 0) {
          const apiUrl = `http://localhost:5039/api/Do/${this.personId}/${this.editDoId}`;

          this.http.get(apiUrl).subscribe(
            (doData: any) => {
              this.populateForm(doData);
            },
            (error: any) => {
              console.error('Error fetching Do data:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error fetching Person ID:', error);
      }
    );
  }

  onSubmit() {
    if (this.doForm.valid && this.personId !== null) {
      const editedDo = {
        doId: this.editDoId,
        title: this.doForm.value.title,
        description: this.doForm.value.description,
        date: this.doForm.value.date,
        personId: this.personId
      };
  
      const apiUrl = `http://localhost:5039/api/Do/${this.personId}/${this.editDoId}`;
      const httpMethod = 'put';
  
      this.http[httpMethod](apiUrl, editedDo).subscribe(
        (response: any) => {
          this.addOrUpdateDo.emit([JSON.stringify(editedDo)]);
          this.doForm.reset();
          this.router.navigate(['menu']);
        },
        (error: any) => {
          console.error(`Error ${httpMethod}ing data:`, error);
        }
      );
    }
  }

  private populateForm(doData: any) {
    this.doForm.patchValue({
      title: doData.title,
      description: doData.description,
      date: doData.date ? new Date(doData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
  }
}
