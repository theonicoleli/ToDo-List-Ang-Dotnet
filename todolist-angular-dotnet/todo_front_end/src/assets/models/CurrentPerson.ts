import { Observable, BehaviorSubject } from 'rxjs';
import { Person } from './Person';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export class CurrentPerson {
    private static personSubject = new BehaviorSubject<Person | null>(null);
    private static person: Person | null = null;

    private constructor(private router: Router) {
        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                if (event.url === '/' || event.url === '/login') {
                    const currentPerson = CurrentPerson.personSubject.getValue();

                    if (!currentPerson) {
                        CurrentPerson.personSubject.next(CurrentPerson.person);
                    }
                }
            });
    }

    static getPerson(): Person | null {
        return CurrentPerson.personSubject.getValue();
    }

    static setPerson(person: Person): void {
        const currentPerson = CurrentPerson.personSubject.getValue();

        if (!currentPerson) {
            CurrentPerson.personSubject.next(person);
            CurrentPerson.person = person;
        }
    }

    static setPersonBoolean(execChange: boolean): void {
        if (execChange) {
            CurrentPerson.person = null;
        }
        return;
    }

    static getPersonObservable(): Observable<Person | null> {
        return CurrentPerson.personSubject.asObservable();
    }
}
