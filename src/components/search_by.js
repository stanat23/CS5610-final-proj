import axios from "axios";
import {useState} from "react";
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const SearchBy = async (term, location) => {
    const [businesses, setBusinesses] = useState([]);
    const locationString = location || 'boston';
    const searchString = term || 'starbucks';
    const response = await axios.get(`${BASE_URL}?term=${searchString}&location=${locationString}`,
        {headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            }})
    setBusinesses(response.data.businesses);
}

export default SearchBy;