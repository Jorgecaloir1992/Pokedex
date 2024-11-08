import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { listaPokemon, PokemonDetails } from "../../../../pokemon.model";
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  
  constructor(private http: CharacterService) {}
  pokemonList: listaPokemon[] = [];
  filteredList: listaPokemon[] = [];
  selectedPokemon: listaPokemon | null = null;
  show: boolean = false;
  currentPage: number = 1;
  pageSize: number = 20;
  favorites: listaPokemon[] = [];
  selectedCard: listaPokemon | null = null;

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
   try {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.http.list(offset, this.pageSize).subscribe((data: any) => {
      this.pokemonList = data;
      this.getCharaterDetails();
      this.filteredList = [...data];
      console.log(this.pokemonList, 'resultado');
    });
   } catch (error) {
    console.log(error, 'alerta!')
   }
  }

  getCharaterDetails() {
    const requests = this.pokemonList.map((pokemon: any) => {
      return this.http.getPokemonDetails(pokemon.name).pipe(
        map(details => ({ ...pokemon, details })) 
        
      );
    });
    forkJoin(requests).subscribe((pokemonWithDetails: any) => {
      this.pokemonList = pokemonWithDetails;
      this.filteredList = [...this.pokemonList];
      console.log(this.pokemonList, 'con detalles');
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchData = inputElement.value.toLowerCase();
    this.filteredList = this.pokemonList.filter((data: listaPokemon) =>
      data.name.toLowerCase().startsWith(searchData)
    );
  }

  onSelected(item: listaPokemon) {
    this.selectedCard = item;
    this.show = true;
    console.log(this.selectedCard, ' elemento seleccionado');
    console.log(this.show);
  }

  addFavorites(pokemon: listaPokemon) {
    if (!this.favorites.includes(pokemon)) {
      this.favorites.push(pokemon);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getCharacters();
  }
}
