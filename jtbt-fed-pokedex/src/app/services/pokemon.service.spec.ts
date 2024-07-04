import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { of } from 'rxjs';

interface PokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial pokemons', (done) => {
    const mockPokemons: PokemonResponse[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `pokemon${i + 1}`,
      sprites: { front_default: `pokemon${i + 1}.png` },
      types: [{ type: { name: 'type' } }],
    }));

    jest.spyOn(service, 'getPokemon').mockImplementation((id: number) => {
      const pokemon = mockPokemons.find(p => p.id === id);
      return of({
        id: pokemon!.id,
        name: `Pokemon ${pokemon!.id}`,
        imageUrl: pokemon!.sprites.front_default,
        types: pokemon!.types.map(typeInfo => typeInfo.type.name)
      });
    });

    service.loadInitialPokemons().subscribe((pokemons) => {
      expect(pokemons.length).toBe(10);
      done();
    });
  });

  it('should capitalize the first letter of a string', () => {
    const result = (service as any).capitalizeFirstLetter('bulbasaur');
    expect(result).toBe('Bulbasaur');
  });
});
