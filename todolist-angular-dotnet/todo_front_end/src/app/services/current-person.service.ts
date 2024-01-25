import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../../assets/models/Person';

@Injectable({
  providedIn: 'root',
})
export class CurrentPersonService {
  private currentPersonSubject = new BehaviorSubject<Person | null>(null);
  currentPerson$: Observable<Person | null> = this.currentPersonSubject.asObservable();

  setPerson(person: Person): void {
    this.currentPersonSubject.next(person);
  }

  getPerson(): Person | null {
    return this.currentPersonSubject.value;
  }
}