import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  getPokemon(@Param('id') id: number) {
    return this.pokemonService.getPokemon(id);
  }

  @Get('detail/:id')
  getPokemonDetail(@Param('id') id: number) {
    return this.pokemonService.getPokemonDetail(id);
  }
}
