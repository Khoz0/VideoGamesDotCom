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
import {DiscussionComponent} from "./shared/discussion/discussion.component";
import {PostComponent} from "./shared/post/post.component";
import {GamesComponent} from "./games/games.component";
import {GamesListComponent} from "./games-list/games-list.component";
import {InterfaceAdminComponent} from "./interface-admin/interface-admin.component";

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
  { path: 'discussions', component: DiscussionComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'games/:id', component: GamesComponent},
  { path: 'games', component: GamesListComponent},
  { path: 'admin', component: InterfaceAdminComponent},

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
