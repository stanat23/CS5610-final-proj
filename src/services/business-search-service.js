import axios from 'axios';
const BASE_API = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`;
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

export const findAllBusinesses = async (term, location) => {
    const searchString = term || 'starbucks';
    const locationString = location || 'boston';
    const response = await axios.get(`${BASE_API}?term=${searchString}&location=${locationString}`,
        {headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            }})
    return response.data;
}