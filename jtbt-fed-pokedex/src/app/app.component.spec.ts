import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PokemonService } from './services/pokemon.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
        AppComponent,
        PokemonCardComponent
      ],
      providers: [
        provideRouter([]),
        { provide: PokemonService, useValue: pokemonServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
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
