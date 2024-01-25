import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MenuComponent } from './components/menu/menu.component';
import { EditDeleteComponent } from './components/edit-delete/edit-delete.component';
import { EditScreenComponent } from './components/edit-screen/edit-screen.component';
import { AddScreenComponent } from './components/add-screen/add-screen.component';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    MenuComponent,
    EditDeleteComponent,
    EditScreenComponent,
    AddScreenComponent,
    EditPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
