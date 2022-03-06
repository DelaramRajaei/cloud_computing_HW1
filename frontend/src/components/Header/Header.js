import React, { Fragment } from "react";
import "./Header.css";
import Card from "../Card/Card";

const header = ({ searchMovie, query, setQuery, smovies }) => {
  return (
    <Fragment>
      <div className="header">
        <h1 className="title">Cloud Computing Homework</h1>
        {/* Search form*/}
        <div className="search">
          <form className="search-form" onSubmit={searchMovie}>
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
      <div className="list-movie">
        <Card movies={smovies} />
      </div>
    </Fragment>
  );
};

export default header;
