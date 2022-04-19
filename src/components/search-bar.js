import React, {useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSearch} from "../context/search-context";
import axios from "axios";
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const SearchBar = (props) => {
    const termSearchRef = useRef();
    const locationSearchRef = useRef();
    const {term, updateTerm, location, updateLocation} = useSearch();
    const nav = useNavigate();
    const Submit = () => {
        props.searchHandler(term, location);
        nav(`/search/${location}/${term}`);
        console.log(term, location);
    }
    return (
        <div className="row m-3 bg-danger" style={{height: 80}}>
            <div className="col-5 m-3">
                <label className="me-3" form="search-term">
                    Search
                </label>
                <input
                    onChange={(e)=>updateTerm(e.target.value)}
                    ref={termSearchRef}
                    value={term}
                    placeholder="Starbucks"
                    className="h-100 w-75 ps-2"
                    id="search-term"/>
            </div>
            <div className="col-5 m-3">
                <label className="me-3" form="search-location">
                    Near
                </label>
                <input
                    onChange={(e)=>updateLocation(e.target.value)}
                    ref={locationSearchRef}
                    value={location}
                    placeholder="Boston, MA"
                    className="h-100 w-75 ps-2"
                    id="search-location"/>
            </div>
            <button
                onClick={Submit}
                className="btn btn-primary col-1 m-3 float-end">
                <i className="fas fa-search fa-2x"/>
            </button>
        </div>
    );
};

export default SearchBar;