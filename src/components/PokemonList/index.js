import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setPokemon([...pokemon, ...response.data.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, [limit, offset]);

  const handleLoadMore = () => {
    setOffset(offset + limit);
  };

  const handlePokemonClick = (name) => {
    alert(`Hey you have clicked on ${name}`);
  };

  if (error) {
    return <div>Error fetching Pokemon.</div>;
  }

  return (
    <div>
      {loading ? (
        <div>Loading Pokemon...</div>
      ) : (
        <>
          <div className="pokemon-list">
            {pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                onClick={() => handlePokemonClick(pokemon.name)}
              />
            ))}
          </div>
          <button onClick={handleLoadMore}>Load more</button>
        </>
      )}
    </div>
  );
};

const PokemonCard = ({ name, url, onClick }) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <h2>{name}</h2>
      <img src={url} alt={name} />
    </div>
  );
};

export default PokemonList;
