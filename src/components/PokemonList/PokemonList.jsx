import { useEffect } from "react";
import "./PokemonList.css";
import { useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
const [pokemonListState,setPokemonListState]=usePokemonList()
  return (
    <>
      {/* <button onClick={()=>setCount(count+1)}>Click</button>
            {count}
            <button onClick={()=>setX(x+1)}>Click</button>
            {x} */}

      <div className="pokemon-list-wrapper">
        {/* <div id="pokemon-list-header">pokemonList</div> */}
        <div>
          <h1>Pokemon List</h1>
        </div>
        <div className="page-controls">
          <button
            onClick={() =>
              setPokemonListState({
                ...pokemonListState,
                pokedexUrl: pokemonListState.preUrl,
              })
            }
          >
            prev
          </button>
          <button
            onClick={() =>
              setPokemonListState({
                ...pokemonListState,
                pokedexUrl: pokemonListState.nextUrl,
              })
            }
          >
            Next
          </button>
        </div>
        <div className="pokemon-list">
          {pokemonListState.pokemonList.map((pokemon) => (
            <Pokemon
              name={pokemon.name}
              key={pokemon.id}
              url={pokemon.image}
              id={pokemon.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonList;
