import './Search.css';

function Search() {
  return (
    <div className="search-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="Search for a Pokémon"
      />
    </div>
  );
}

export default Search;
