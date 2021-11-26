import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DemandeMdpComponent} from "./demande-mdp/demande-mdp.component";
import {MonCompteComponent} from "./mon-compte/mon-compte.component";
import {ForumComponent} from "./forum/forum.component";
import {TestsComponent} from "./tests/tests.component";
import {ActualitesComponent} from "./actualites/actualites.component";
import {DeconnexionComponent} from "./deconnexion/deconnexion.component";
import {DiscusionComponent} from "./shared/discusion/discusion.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'demande-mdp', component: DemandeMdpComponent },
  { path: 'mon-compte', component: MonCompteComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'actualites', component: ActualitesComponent },
  { path: 'deconnexion', component: DeconnexionComponent },
  { path: 'discussion', component: DiscusionComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
