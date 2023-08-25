import { useEffect } from "react";
import "./PokemonList.css";
import { useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  // const [count, setCount] = useState(0);
  // const [x,setX]=useState(0)
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemonList, setPokemonList] = useState([]);
  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
  const [preUrl, setPreUrl] = useState(DEFAULT_URL);

  // const POKEDEX_URL="https://pokeapi.co/api/v2/pokemon"

  async function downloadPokemons() {
    const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL);

    const pokenomResults = response.data.results; //array of pokemons

    // console.log(response.data)

    setNextUrl(response.data.next);
    setPreUrl(response.data.previous);

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
    setPokemonList(pokemonFinalList);
    // console.log(pokemonFinalList)
  }

  useEffect(() => {
    // console.log("done")
    downloadPokemons();
  }, [pokedexUrl]);
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
          <button onClick={() => setPokedexUrl(preUrl)}>prev</button>
          <button onClick={() => setPokedexUrl(nextUrl)}>Next</button>
        </div>
        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image}  id={pokemon.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonList;
