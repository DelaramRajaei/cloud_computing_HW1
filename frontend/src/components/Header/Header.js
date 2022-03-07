import React, { Fragment,useState } from "react";
import "./Header.css";

const Header = ({ onSearchMovie }) => {
  const [query, setQuery] = useState('')
  return (
    <Fragment>
      <div className="header">
        <h1 className="title">Cloud Computing Homework</h1>
        {/* Search form */}
        <div className="search">
          <form className="search-form" onSubmit={(e)=>{e.preventDefault(); onSearchMovie(query)}}>
            <label htmlFor="query" className="name"></label>
            <input
              type="text"
              name="query"
              placeholder="i.e Fringe"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
