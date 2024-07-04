import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDetail } from '../models/pokemon-detail.model';


@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail: PokemonDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetail(+id).subscribe(detail => {
        this.pokemonDetail = detail;
      });
    }
  }

  getTypeClass(): string {
    return this.pokemonDetail ? this.pokemonDetail.types[0] : '';
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
