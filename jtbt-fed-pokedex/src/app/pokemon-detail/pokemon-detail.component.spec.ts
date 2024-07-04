import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonDetail } from '../models/pokemon-detail.model';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockPokemonService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockPokemonService = {
      getPokemonDetail: jest.fn()
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn()
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemon details on init', () => {
    const mockDetail: PokemonDetail = {
      id: 1,
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      moves: ['tackle', 'vine whip']
    };

    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
    mockPokemonService.getPokemonDetail.mockReturnValue(of(mockDetail));

    component.ngOnInit();

    expect(mockPokemonService.getPokemonDetail).toHaveBeenCalledWith(1);
    expect(component.pokemonDetail).toEqual(mockDetail);
  });
});
