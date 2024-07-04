import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchQuery: string = '';
  currentBatch: number = 0;
  maxBatches: number = 5;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadInitialPokemons();
  }

  loadInitialPokemons() {
    this.pokemonService.loadInitialPokemons().subscribe(pokemonList => {
      this.pokemons.push(...pokemonList);
      this.currentBatch++;
    });
  }

  loadMorePokemons() {
    this.pokemonService.loadAdditionalPokemons(this.currentBatch).subscribe(pokemonList => {
      this.pokemons.push(...pokemonList);
      this.currentBatch++;
    });
  }

  searchPokemons() {
    if (this.searchQuery.length >= 3) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }

  goToDetail(id: number) {
    this.router.navigate(['/pokemon', id]);
  }

  onEnter() {
    const pokemon = this.filteredPokemons.find(p => p.name.toLowerCase() === this.searchQuery.toLowerCase());
    if (pokemon) {
      this.goToDetail(pokemon.id);
    }
  }

  trackByFn(index: number, item: Pokemon) {
    return item.id;
  }
}
