import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../../assets/models/Person';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent {

  @Output() addOrUpdateDo = new EventEmitter<Array<string>>();

  editDoId: number = 0;
  person: Person = new Person(0, '', '', '', []);
  doForm: FormGroup;

  linkGetPerson: string = 'http://localhost:5039/api/person/';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) 
  {
    this.doForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.editDoId = idParam ? +idParam : 0;
    });

    const getPersonId = this.linkGetPerson + this.editDoId;

    this.http.get<Person>(getPersonId).subscribe(
      (dbData: Person) => {

        this.doForm.patchValue({
          name: dbData.name,
          email: dbData.email,
          password: dbData.password
        })
        
        this.person.personId = dbData.personId;
        this.person.name = dbData.name;
        this.person.email = dbData.email;
        this.person.password = dbData.password;
        this.person.dos = dbData.dos;
      },
      (error: any) => {
        console.error("Something wrong happened:", error);
      }
    );
  }

  onSubmit() {
    if (this.doForm.valid && this.person.personId !== null) {
      const editedPerson = {
        personId: this.person.personId,
        name: this.doForm.value.name,
        email: this.doForm.value.email,
        password: this.doForm.value.password,
        dos: this.person.dos
      };
  
      const apiUrl = `http://localhost:5039/api/person/${this.person.personId}`;
      const httpMethod = 'put';
  
      this.http[httpMethod](apiUrl, editedPerson).subscribe(
        (response: any) => {
          this.person.name = editedPerson.name;
          this.person.email = editedPerson.email;
          this.person.password = editedPerson.password;
  
          this.doForm.reset();
          this.router.navigate(['menu']);
        },
        (error: any) => {
          console.error(`Error ${httpMethod}ing data:`, error);
        }
      );
    }
  }
  

}
