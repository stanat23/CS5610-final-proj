import SearchResultSummary from "./search-result-summary";
import SearchResult from "./search-result";
import React from "react";
import SearchBar from "../components/search-bar";
import Nav from "../components/nav";

const Search = () => {
    return (
        <div className="container">
            <div className="row">
                <SearchBar/>
                <div className="col-2">
                    <Nav/>
                </div>
                <div className="col-10">
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
            </div>
        </div>
    );
};

export default Search;
