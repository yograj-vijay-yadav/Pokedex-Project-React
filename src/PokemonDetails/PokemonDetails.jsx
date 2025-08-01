import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonDetails() {
  const { id } = useParams();                     // Get ID from URL
  const [pokemon, setPokemon] = useState(null);   // Local state to store fetched data

  useEffect(() => {
    async function downloadPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log("Pokemon Details:", response.data);
        setPokemon(response.data);                // Store data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    downloadPokemon();
  }, [id]); // rerun if ID changes

  return (
    <div>
      <h1>Pokemon Details</h1>
      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonDetails;
