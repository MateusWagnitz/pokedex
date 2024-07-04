import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { Pokemon } from '../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PokemonCardComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the pokemon details', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: ['grass', 'poison']
    };

    component.pokemon = mockPokemon;
    fixture.detectChanges();

    const nameElement = fixture.nativeElement.querySelector('h3');
    const imgElement = fixture.nativeElement.querySelector('img');

    expect(nameElement.textContent).toContain('Bulbasaur');
    expect(imgElement.src).toContain(mockPokemon.imageUrl);
  });

  it('should have the correct class based on pokemon type', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: ['grass', 'poison']
    };

    component.pokemon = mockPokemon;
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.pokemon-card');

    expect(cardElement.classList).toContain('grass');
  });

  it('should navigate to the correct URL when the link is clicked', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: ['grass', 'poison']
    };

    component.pokemon = mockPokemon;
    fixture.detectChanges();

    const anchorElement = fixture.nativeElement.querySelector('a');
    anchorElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['/pokemon', 1]);
  });
});
