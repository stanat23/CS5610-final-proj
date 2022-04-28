import SearchResultSummary from "./search-result-summary";
import SearchResult from "./search-result";
import React from "react";

const Search = () => {
    return (
        <div>
            <h1>Business Search</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <SearchResultSummary/>
                </li>
                <li className="list-group-item">
                    <SearchResult/>
                </li>
            </ul>
        </div>
    );
};

export default Search;
