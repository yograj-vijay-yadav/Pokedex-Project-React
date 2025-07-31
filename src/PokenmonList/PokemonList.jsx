import { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import axios from 'axios';

function PokemonList() {
  const [isLoading, setIsLoading] = useState(true);      // loading state
  const [pokemonList, setPokemonList] = useState([]);    // list of pokemons
  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextUrl, setNextUrl] = useState("");             // next page URL
  const [prevUrl, setPrevUrl] = useState("");             // previous page URL

  async function downloadData() {
    try {
      // ✅ Make API call to the current pokedex URL
      setIsLoading(true)
      const response = await axios.get(pokedexUrl);
      console.log("Response:", response.data);
      
      const pokemonResults = response.data.results;

      // ✅ Save next and previous URLs for pagination
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);  // fixed: not 'prev'
        console.log("Next URL:", nextUrl);

      // ✅ For each pokemon in result, fetch its details
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      
      // ✅ Await all promises
      const pokemonData = await axios.all(pokemonResultPromise);
        console.log("Pokemon Data:", pokemonData);
      // ✅ Format the final data for rendering
      const res = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other?.['official-artwork']?.front_default || '',
          types: pokemon.types,
        };
      });
        console.log("Formatted Pokemon Data:", res);

      setPokemonList(res);      // store processed list
      setIsLoading(false);      // turn off loading
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  // ✅ Fetch data whenever pokedexUrl changes
  useEffect(() => {
    downloadData();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h3>Pokemon List</h3>
      
      <div className='pokemon-wrapper'>
        {isLoading ? (
          "Loading..."
        ) : (
          pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} />
          ))
        )}
      </div>

      <div className="controls">
        {/* ✅ Pagination buttons */}
        <button disabled={!prevUrl} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
        <button disabled={!nextUrl} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
