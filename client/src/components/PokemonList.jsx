import React from 'react'

import PokemonInstance from './PokemonInstance.jsx'

export default function PokemonList({ pokemon, selectedType, getAll }) {
  let pokemonToMap;
  if (selectedType === 'all') {
    pokemonToMap = pokemon;
  } else {
    pokemonToMap = pokemon.filter(pokemonDuJour =>
          pokemonDuJour.type === selectedType
          )
      }
  return (
    <div>
    {pokemonToMap.map((currentPokemon, index) => {
      return <PokemonInstance currentPokemon={currentPokemon} getAll={getAll} key={index}/>
    })}
    </div>
  )
}
