import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MenuComponent } from './components/menu/menu.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AddScreenComponent } from './components/add-screen/add-screen.component';
import { EditScreenComponent } from './components/edit-screen/edit-screen.component';
import { AppComponent } from './app.component';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'menu', component: MenuComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'add', component: AddScreenComponent },
  { path: 'edit/:id', component: EditScreenComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'edit-perfil/:id', component: EditPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
