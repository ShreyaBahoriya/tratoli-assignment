import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonDetails = ({ pokemonUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(pokemonUrl)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, [pokemonUrl]);

  if (error) {
    return <div>Error fetching Pokemon details.</div>;
  }

  return (
    <div className="pokemon-details">
      {loading ? (
        <div>Loading Pokemon details...</div>
      ) : (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>
            <strong>Abilities:</strong>
            {pokemon.abilities.map((ability) => (
              <div key={ability.ability.name}>{ability.ability.name}</div>
            ))}
          </div>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;