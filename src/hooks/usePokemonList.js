import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
      // const [count, setCount] = useState(0);
  // const [x,setX]=useState(0)
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

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

  async function downloadPokemons() {
    const response = await axios.get(
      pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL
    );

    const pokenomResults = response.data.results; //array of pokemons

    // console.log(response.data)

    // setNextUrl(response.data.next);
    // setPreUrl(response.data.previous);
    // setPokemonListState((state)=>({
    //   ...state,
    //   nextUrl: response.data.next,
    //   preUrl: response.data.previous,
    // }));

    const pokemonPromise = pokenomResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    // console.log(pokemonPromise)

    const pokemonListData = await axios.all(pokemonPromise);
    // console.log(pokemonListData)
    const pokemonFinalList = pokemonListData.map((pokemonData) => {
      const pokemon = pokemonData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    // setPokemonList(pokemonFinalList);
    // console.log(pokemonFinalList)
    setPokemonListState({ ...pokemonListState, pokemonList: pokemonFinalList,nextUrl:response.data.next });
  }

  useEffect(() => {
    // console.log("done")
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState,setPokemonListState];

}

export default usePokemonList