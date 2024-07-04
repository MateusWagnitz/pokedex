import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent }
];
