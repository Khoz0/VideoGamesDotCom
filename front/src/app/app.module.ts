import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { HomeComponent } from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DemandeMdpComponent } from './demande-mdp/demande-mdp.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ForumComponent } from './forum/forum.component';
import { TestsComponent } from './tests/tests.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DiscussionComponent } from './shared/discussion/discussion.component';
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InscriptionComponent,
    ConnexionComponent,
    MonCompteComponent,
    NotFoundComponent,
    DemandeMdpComponent,
    ForumComponent,
    TestsComponent,
    ActualitesComponent,
    DeconnexionComponent,
    DiscussionComponent,
    PostComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
