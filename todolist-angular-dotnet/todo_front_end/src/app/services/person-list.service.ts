import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Person } from '../../assets/models/Person';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentPerson } from '../../assets/models/CurrentPerson';

@Injectable({
  providedIn: 'root',
})
export class PersonListService {
  private apiUrl = 'http://localhost:5039/api/person';
  private activityCompleted$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  getActivityCompleted(): Observable<boolean> {
    return this.activityCompleted$.asObservable();
  }

  checkValidAccount(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Person[]>(this.apiUrl).subscribe(
        (response) => {
          const isValidAccount = response.some((person) =>
            this.comparePerson(person, email, password)
          );

          if (isValidAccount) {
            const validPerson = response.find((person) =>
              this.comparePerson(person, email, password)
            );

            if (validPerson) {
              this.fetchPersonDetails(validPerson.personId).subscribe(
                (personDetails) => {
                  this.activityCompleted$.next(true);
                  CurrentPerson.setPerson(personDetails);
                  observer.next(true);
                  observer.complete();
                },
                (error) => {
                  observer.error('Erro ao obter dados:' + error);
                }
              );
            }
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        (error) => {
          observer.error('Erro ao obter dados:' + error);
        }
      );
    });
  }

  public fetchPersonDetails(personId: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${personId}`);
  }

  private comparePerson(person: Person, email: string, password: string): boolean {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    return (
      person.email.trim().toLowerCase() === trimmedEmail &&
      person.password.trim() === trimmedPassword
    );
  }
}
