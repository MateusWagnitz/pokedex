import { Injectable } from '@angular/core';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map, switchMap, of, Observable, forkJoin } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonDetail } from '../models/pokemon-detail.model';

interface PokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}

interface PokemonDetailResponse {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string }
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'http://localhost:3000/api'

  getPokemon(id: number): Observable<Pokemon> {
    return fromFetch(`${this.apiUrl}/pokemon/${id}`).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ id, name: `Error ${response.status}`, sprites: { front_default: '' }, types: [] });
        }
      }),
      map((data: PokemonResponse) => ({
        id: data.id,
        name: this.capitalizeFirstLetter(data.name),
        imageUrl: data.sprites.front_default,
        types: data.types.map(typeInfo => typeInfo.type.name)
      })),
      catchError(() => of({ id, name: 'Error', imageUrl: '', types: [] }))
    );
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    return fromFetch(`${this.apiUrl}/pokemon/detail/${id}`).pipe(
      switchMap(response => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ id, name: `Error ${response.status}`, types: [], moves: [], imageUrl: '' });
        }
      }),
      map((data: PokemonDetailResponse) => ({
        id: data.id,
        name: this.capitalizeFirstLetter(data.name),
        types: data.types.map(typeInfo => typeInfo.type.name),
        moves: data.moves.slice(0, 2).map(moveInfo => moveInfo.move.name),
        imageUrl: data.sprites.front_default
      })),
      catchError(() => of({ id, name: 'Error', types: [], moves: [], imageUrl: '' }))
    );
  }

  loadInitialPokemons(): Observable<Pokemon[]> {
    const requests = [];
    for (let i = 1; i <= 10; i++) {
      requests.push(this.getPokemon(i));
    }
    return forkJoin(requests);
  }

  loadAdditionalPokemons(batch: number): Observable<Pokemon[]> {
    const start = batch * 10 + 1;
    const end = start + 9;
    const requests = [];
    for (let i = start; i <= end; i++) {
      requests.push(this.getPokemon(i));
    }
    return forkJoin(requests);
  }

  private capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
