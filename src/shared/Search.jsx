import { useDebouncedCallback } from "use-debounce";
export const Search = ({ search, setSearch, setPage }) => {
  const handleSearch = useDebouncedCallback((value) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  return (
    <div className="search-input">
      <input
        type="search"
        defaultValue={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};
