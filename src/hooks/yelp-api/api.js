const API_URL = 'https://api.yelp.com/v3/businesses/search';
const BEARER_TOKEN = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const get = (term, location) => {
    return fetch(`${API_URL}?term=${term}&location=${location}`, {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Origin: 'localhost',
            withCredentials: true
        }
    });
};

export default get;