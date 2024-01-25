import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonListService } from './services/person-list.service';
import { Person } from '../assets/models/Person';
import { DOCUMENT } from '@angular/common';
import { CurrentPerson } from '../assets/models/CurrentPerson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front-end-todo';
  personSession: Person = new Person(0, '', '', '', []);
  email: string = '';
  password: string = '';
  isValidAccount: boolean = false;
  showLoginForm: boolean = true;
  currentRoute: string = '';
  activateRouterLink: boolean = false;

  constructor(
    private authService: PersonListService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {

    this.router.events.subscribe(() => {
      this.currentRoute = this.route.snapshot.firstChild?.routeConfig?.path || '';

      if (this.currentRoute !== 'menu') {
        this.renderer.addClass(this.document.body, 'conditional-styling');
      } else {
        this.renderer.removeClass(this.document.body, 'conditional-styling');
      }
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  navigateToMenu() {
    console.log('Navigating to /menu');
    this.activateRouterLink = true;
    this.router.navigate(['/menu']);
  }

  submitForm() {
    this.authService.checkValidAccount(this.email, this.password).subscribe(
      (isValid) => {
        if (isValid) {
          console.log('Conta válida.');
          console.log(CurrentPerson.getPerson())
          this.navigateToMenu();
        } else {
          console.log('Conta inválida.');
        }
      },
      (error) => {
        console.error('Erro ao verificar conta:', error);
      }
    );
  }
}
