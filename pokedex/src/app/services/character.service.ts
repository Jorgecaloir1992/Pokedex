import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { PokemonDetails, listaPokemon } from '../../pokemon.model';

export interface Pokemon { name: string; url: string; }
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor( private http: HttpClient) { }

  list(offset: number, limit: number): Observable<listaPokemon[]>{
    const params = `?offset=${offset}&limit=${limit}`;
    return this.http.get<{ results: Pokemon[] }>(environment.apiUrl + '/pokemon' + params).pipe(
      map(res => res.results) );
  }

  getPokemonDetails(data: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(environment.apiUrl + '/pokemon/' + data);
  }  
  
}