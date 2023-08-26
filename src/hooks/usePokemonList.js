import axios from "axios";
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";

function usePokemonList(DEFAULT_URL) {
  // const [count, setCount] = useState(0);
  // const [x,setX]=useState(0)
  //   const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  // const [pokemonList, setPokemonList] = useState([]);
  // const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
  // const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
  // const [preUrl, setPreUrl] = useState(DEFAULT_URL);

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    pokedexUrl: DEFAULT_URL,
    nextUrl: DEFAULT_URL,
    preUrl: DEFAULT_URL,
  });

  // const POKEDEX_URL="https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    // console.log("done")
    downloadPokemons(pokemonListState, setPokemonListState, DEFAULT_URL);
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
