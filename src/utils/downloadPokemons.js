import axios from "axios";

axios
async function downloadPokemons(pokemonListState,setPokemonListState,default_url) {
    const response = await axios.get(
      pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : default_url
    );

    const pokenomResults = response.data.results?response.data.results:response.data.pokemon; //array of pokemons

    // console.log(response.data)

    // setNextUrl(response.data.next);
    // setPreUrl(response.data.previous);
    // setPokemonListState((state)=>({
    //   ...state,
    //   nextUrl: response.data.next,
    //   preUrl: response.data.previous,
    // }));

    const pokemonPromise = pokenomResults.map((p) =>

    {
        if(p.url){
        return    axios.get(p.url)
        }else if(p.pokemon.url)
        return axios.get(p.pokemon.url)
    }
    );
    // console.log(pokemonPromise)

    const pokemonListData = await axios.all(pokemonPromise);
    console.log(pokemonListData)
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

  export default downloadPokemons