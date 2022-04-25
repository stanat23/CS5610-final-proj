import React, {useRef, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSearch} from "../context/search-context";
import axios from "axios";
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const SearchBar = () => {
    const termSearchRef = useRef();
    const locationSearchRef = useRef();
    const {businessSearch, locationSearch} = useParams();
    const {updateBusinesses} = useSearch();
    const nav = useNavigate();
    const searchBy = async () => {
        const locationString = locationSearchRef.current.value || businessSearch || 'boston';
        const searchString = termSearchRef.current.value || locationSearch || 'starbucks';
        const response = await axios.get(`${BASE_URL}?term=${searchString}&location=${locationString}`,
            {headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                }})
        termSearchRef.current.value = searchString;
        locationSearchRef.current.value = locationString;
        updateBusinesses(response.data.businesses);
        nav(`/search/${locationString}/${searchString}`);
    }
    useEffect(()=>{
        searchBy();
    }, []);
    return (
        <div className="row m-3 bg-danger" style={{height: 80}}>
            <div className="col-5 m-3">
                <label className="me-3" form="search-term">
                    Search
                </label>
                <input
                    ref={termSearchRef}
                    placeholder="Starbucks"
                    className="h-100 w-75 ps-2"
                    id="search-term"/>
            </div>
            <div className="col-5 m-3">
                <label className="me-3" form="search-location">
                    Near
                </label>
                <input
                    ref={locationSearchRef}
                    placeholder="Boston, MA"
                    className="h-100 w-75 ps-2"
                    id="search-location"/>
            </div>
            <button
                onClick={searchBy}
                className="btn btn-primary col-1 m-3 float-end">
                <i className="fas fa-search fa-2x"/>
            </button>
        </div>
    );
};

export default SearchBar;