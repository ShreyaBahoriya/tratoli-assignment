import "./App.css";

import React, { useState } from "react";
import PokemonList from "./components/PokemonList/index.js";
import PokemonDetails from "./components/PokemonDetails/index.js";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonClick = (pokemonUrl) => {
    setSelectedPokemon(pokemonUrl);
  };

  const handleModalClose = () => {
    setSelectedPokemon(null);
  };
  return (
    <div className="app">
      <h1>Pokemon List</h1>
      <PokemonList onPokemonClick={handlePokemonClick} />
      {selectedPokemon && (
        <div className="modal">
          <PokemonDetails
            pokemonUrl={selectedPokemon}
            onClose={handleModalClose}
          />
        </div>
      )}
    </div>
  );
};

export default App;
