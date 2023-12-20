import React, { useState } from "react";
type Props = {
  onSearch: any;
};

const Search = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm bg-[#313378] text-white focus:ring-indigo-500 focus:border-indigo-500 rounded-lg focus:outline-none focus:shadow-outline"
          placeholder="Search artists, albums..."
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={true}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800 invisible md:visible"
        >
          Search
        </button>
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white rounded-r-lg focus:ring-4 focus:outline-none focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 visible md:invisible "
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};

export default Search;
