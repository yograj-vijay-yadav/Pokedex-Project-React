import { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import axios from 'axios';

function PokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    isLoading: true,
    pokemonList: [],
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    prevUrl: ''
  });

  async function downloadData() {
    try {
      // Start loading
      setPokemonListState(prev => ({ ...prev, isLoading: true }));

      // Fetch list of Pokémon
      const response = await axios.get(pokemonListState.pokedexUrl);
      const pokemonResults = response.data.results;

      const pokemonResultPromises = pokemonResults.map(pokemon =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(pokemonResultPromises);

      const formattedData = pokemonData.map(pokeData => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other?.['official-artwork']?.front_default || '',
          types: pokemon.types,
        };
      });

      // Update all state in one go
      setPokemonListState(prev => ({
        ...prev,
        isLoading: false,
        pokemonList: formattedData,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  // Refetch whenever pokedexUrl changes
  useEffect(() => {
    downloadData();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h3>Pokemon List</h3>

      <div className='pokemon-wrapper'>
        {pokemonListState.isLoading ? (
          "Loading..."
        ) : (
          pokemonListState.pokemonList.map(p => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))
        )}
      </div>

      <div className="controls">
        <button
          disabled={!pokemonListState.prevUrl}
          onClick={() =>
            setPokemonListState(prev => ({
              ...prev,
              pokedexUrl: pokemonListState.prevUrl
            }))
          }
        >
          Prev
        </button>
        <button
          disabled={!pokemonListState.nextUrl}
          onClick={() =>
            setPokemonListState(prev => ({
              ...prev,
              pokedexUrl: pokemonListState.nextUrl
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
