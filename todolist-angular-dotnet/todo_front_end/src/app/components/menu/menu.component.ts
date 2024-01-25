import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { PersonListService } from '../../services/person-list.service';
import { CurrentPerson } from '../../../assets/models/CurrentPerson';
import { Do } from '../../../assets/models/Do';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Person } from '../../../assets/models/Person';
import { DoListService } from '../../services/do-list.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  editPerson: string = 'Edit';
  deletePerson: string = 'Delete';
  editPersonColor: string = 'green';
  deletePersonColor: string = 'red';
  currentPerson: Person | null = null;
  isDeletionInProgress: boolean = false;

  execDeleteTrue: boolean = true;
  execDeleteFalse: boolean = false;

  private leaveConfirmation = new Subject<boolean>();
  private dosSubscription: Subscription | undefined;
  

  constructor(
    private personListService: PersonListService,
    private router: Router,
    private doListService: DoListService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (CurrentPerson.getPerson() !== null && CurrentPerson.getPerson() == this.currentPerson) {
          this.saveCurrentPersonToLocalStorage();
        } else {
          if (CurrentPerson.getPerson() !== this.currentPerson && CurrentPerson.getPerson() !== null) {
            this.clearLocalStorage();
          }
        }
      });
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const storedPersonData = localStorage.getItem('currentPerson');

      if (storedPersonData) {

        if (CurrentPerson !== null && CurrentPerson.getPerson()?.personId != JSON.parse(storedPersonData)?.personId ) {

          this.currentPerson = JSON.parse(storedPersonData);

          if (this.dosSubscription) {
            this.dosSubscription.unsubscribe();
          }

          if (this.currentPerson && this.currentPerson.dos instanceof Observable) {
            this.dosSubscription = this.currentPerson.dos.subscribe((dos: Do[]) => {
              console.log(dos);
              this.cdr.detectChanges();
            });
          }
          else {
            this.fetchPersonDetailsAndSubscribe();
          }
        }
      } else {
        this.fetchPersonDetailsAndSubscribe();
      }
    } else {
      this.fetchPersonDetailsAndSubscribe();
    }
  }

  fetchPersonDetailsAndSubscribe() {
    const personId = CurrentPerson.getPerson()?.personId;

    if (personId !== undefined) {
      this.personListService.fetchPersonDetails(personId).subscribe(
        (currentPerson: Person) => {
          this.currentPerson = currentPerson;

          if (this.dosSubscription) {
            this.dosSubscription.unsubscribe();
          }

          if (this.currentPerson && this.currentPerson.dos instanceof Observable) {
            this.dosSubscription = this.currentPerson.dos.subscribe((dos: Do[]) => {
              console.log(dos);
              this.cdr.detectChanges();
            });
          }

          this.saveCurrentPersonToLocalStorage();
        },
        (error) => {
          console.error('Error fetching person details:', error);
        }
      );
    }
  }

  onDeleteDo(doId: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
  
    if (isConfirmed) {
      this.doListService.deleteDo(this.currentPerson?.personId || 0, doId).subscribe(
        () => {
          console.log(`Do with ID ${doId} deleted successfully.`);
          this.personListService.fetchPersonDetails(this.currentPerson?.personId || 0).subscribe(
            (updatedPerson: Person) => {
              if (updatedPerson) {
                this.currentPerson = updatedPerson;
                console.log('Updated activities:', this.currentPerson?.dos);
  
                this.saveCurrentPersonToLocalStorage();
                this.cdr.detectChanges();
              } else {
                console.error('Error: Updated person details not available.');
              }
            },
            (error) => {
              console.error('Error fetching updated activities:', error);
              this.cdr.detectChanges();
            }
          );
        },
        (error) => {
          if (error.status === 404) {
            console.error(`Error deleting item: The resource with ID ${doId} was not found.`);
          } else {
            console.error('Error deleting item:', error);
          }
          this.cdr.detectChanges();
        }
      );
    }
  }   

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.isDeletionInProgress) {
      $event.returnValue = true;
    }
  }

  canDeactivate(): Observable<boolean> {
    if (this.isDeletionInProgress) {
      const confirmation = window.confirm('Are you sure you want to leave? Deletion is in progress.');
      this.leaveConfirmation.next(confirmation);
      return this.leaveConfirmation.asObservable();
    }
    return new Observable<boolean>((observer) => observer.next(true));
  }

  private saveCurrentPersonToLocalStorage() {
    if (this.currentPerson) {
      localStorage.setItem('currentPerson', JSON.stringify(this.currentPerson));
    } else {
      localStorage.removeItem('currentPerson');
    }
  }  

  private clearLocalStorage() {
    localStorage.removeItem('currentPerson');
  }

  ngOnDestroy() {
    if (this.dosSubscription) {
      this.dosSubscription.unsubscribe();
    }
  }

  currentPersonChanging() {
    const change = true;
    this.currentPerson = null;
    CurrentPerson.setPersonBoolean(change);
    this.saveCurrentPersonToLocalStorage();
  }
}
