export interface listaPokemon {
  name: string;
  url: string;
  details?: PokemonDetails;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  weight: number;
  height: number;
  base_experience: number;
}

