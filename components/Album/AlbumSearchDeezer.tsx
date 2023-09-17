import React, { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/Ai";

type Props = {
  onSearch: any;
  emptySearch: any;
};

const Search = ({ onSearch, emptySearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="grid md:grid-cols-2 gap-2 grid-cols-1 ">
      <div>
        <input
          type="text"
          placeholder="Search by artist or album name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="shadow appearance-none border rounded  w-full py-2 px-3 bg-[#313378] text-white focus:ring-indigo-500 focus:border-indigo-500 leading-tight focus:outline-none focus:shadow-outline my-3 mr-3"
          autoFocus={true}
        />
      </div>
      <div className="my-auto">
        <button className="text-xs mr-2" onClick={() => handleSearch()}>
          <AiOutlineSearch size={20} />
        </button>
        <button className="text-xs" onClick={() => emptySearch()}>
          <AiOutlineClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default Search;
