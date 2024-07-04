import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonService } from '../services/pokemon.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pokemonServiceMock: any;

  beforeEach(async () => {
    pokemonServiceMock = {
      loadInitialPokemons: jest.fn().mockReturnValue(of([])),
      loadAdditionalPokemons: jest.fn().mockReturnValue(of([])),
      getPokemon: jest.fn(),
      getPokemonDetail: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HomeComponent,
        PokemonCardComponent
      ],
      providers: [
        provideRouter([]),
        { provide: PokemonService, useValue: pokemonServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial pokemons on init', () => {
    expect(pokemonServiceMock.loadInitialPokemons).toHaveBeenCalled();
  });
});
