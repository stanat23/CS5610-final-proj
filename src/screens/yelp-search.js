import React, {useRef, useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import SearchResultSummary from "../search/search-result-summary";
import SearchResult from "../search/search-result";
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const YelpSearch = () => {
    const titleSearchRef = useRef();
    const {businessSearch} = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState([]);
    const searchUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    const searchByTitle = async () => {
        const locationString = 'boston';
        const searchString = titleSearchRef.current.value || businessSearch || 'starbucks';
        const response = await axios.get(`${searchUrl}?term=${searchString}&location=${locationString}`,
            {headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
            }})
        setBusiness(response.data.businesses)
        titleSearchRef.current.value = searchString
        navigate(`/search/${searchString}`)
    }
    useEffect(() => {
        searchByTitle()
    }, [])
    return (
        <div>
            <h1>Business Search</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        onClick={searchByTitle}
                        className="btn btn-primary float-end">Search</button>
                    <input
                        ref={titleSearchRef}
                        className="form-control w-75"/>
                </li>
                <li className="list-group-item">
                    <SearchResultSummary/>
                </li>
                <li className="list-group-item">
                    <SearchResult/>
                </li>
                {
                    business.map(bus =>
                        <li className="list-group-item row">
                            <img src={bus.image_url} className="me-2 mt-2 col-2 float-start" height={130}/>
                            <div className="col-10">
                                <Link to={`/details/${bus.id}`}>
                                    {bus.name}
                                </Link>
                                <div>
                                    rating: {bus.rating}
                                </div>
                                <div>
                                    address: {bus.location.display_address.join(', ')}
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default YelpSearch;