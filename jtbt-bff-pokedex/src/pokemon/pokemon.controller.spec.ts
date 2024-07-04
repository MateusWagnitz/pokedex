import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { of } from 'rxjs';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getPokemon: jest.fn().mockReturnValue(of({ name: 'Bulbasaur' })),
            getPokemonDetail: jest.fn().mockReturnValue(of({ name: 'Bulbasaur', types: [], moves: [] })),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a pokemon', (done) => {
    controller.getPokemon(1).subscribe(pokemon => {
      expect(pokemon).toHaveProperty('name', 'Bulbasaur');
      done();
    });
  });

  it('should get pokemon details', (done) => {
    controller.getPokemonDetail(1).subscribe(detail => {
      expect(detail).toHaveProperty('name', 'Bulbasaur');
      done();
    });
  });
});
