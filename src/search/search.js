import SearchResultSummary from "./search-result-summary";
import SearchResult from "./search-result";
import React, {useState, useEffect} from "react";
import SearchBar from "../components/search-bar";
import Nav from "../components/nav";
import axios from "axios";
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const Search = (props) => {
    const [businesses, setBusinesses] = useState([]);
    const searchBy = async (term, location) => {
        const locationString = location || 'boston';
        const searchString = term || 'starbucks';
        const response = await axios.get(`${BASE_URL}?term=${searchString}&location=${locationString}`,
            {headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                }})
        setBusinesses(response.data.businesses);
    }
    useEffect(()=>{
        searchBy();
    }, []);
    return (
        <div className="container">
            <div className="row">
                <SearchBar searchHandler = {searchBy}/>
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
                            <SearchResult businesses={businesses}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;
