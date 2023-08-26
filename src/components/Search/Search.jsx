import useDebounce from '../../hooks/useDebounce';
import './Search.css'

function Search(updateSearchTerm){

    const deboundUpdatedSearch=useDebounce ((e)=>updateSearchTerm(e.target.value))
    return(
        <input
        id='search-pokemon'
         type='text' placeholder='which pokemeon youre looking for ?'
            onChange={deboundUpdatedSearch}
         />
    )

}

export default Search;