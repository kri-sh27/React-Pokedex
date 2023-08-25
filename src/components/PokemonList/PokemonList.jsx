import { useEffect } from 'react';
import './PokemonList.css'
import { useState } from 'react';
import axios from 'axios';

function PokemonList(){
    // const [count, setCount] = useState(0);
    // const [x,setX]=useState(0)
    const POKEDEX_URL="https://pokeapi.co/api/v2/pokemon"

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL);
        console.log(response.data)
    }

    useEffect(()=>{
        // console.log("done")
        downloadPokemons()

    },[]);
    return (
        <>
            {/* <button onClick={()=>setCount(count+1)}>Click</button>
            {count}
            <button onClick={()=>setX(x+1)}>Click</button>
            {x} */}
        </>
    )
}

export default PokemonList;