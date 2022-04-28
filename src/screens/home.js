import React, {useEffect, useState} from 'react'
import SecureContent from "../components/secure-content";
import useGeoLocation from "../hooks/useGeoLocation";
import axios from "axios";
import {Link} from "react-router-dom";
const BASE_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const HomeScreen = () => {
    const location = useGeoLocation()
    const lat = location.coordinates.lat;
    const lng = location.coordinates.lng;
    const [restaurants, setRestaurants] = useState([])
    const searchRestaurantsNearby = async () => {
        const termString = 'restaurant';
        const response = await axios.get(`${BASE_SEARCH_URL}?latitude=${lat}&longitude=${lng}&term=${termString}`,
            {headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                }})
        setRestaurants(response.data.businesses);
    }

    useEffect(() => {
        searchRestaurantsNearby();
    }, [lat, lng])
    return (
        <div>
            <div className="container border-light border-2 border">
                <h1 className="m-2 mb-4">
                    About Us
                </h1>
                <div className="m-1">
                    <h5>
                        Our website provides users a place to check on businesses all over the world and get a good idea what they are doing.
                    </h5>
                    <h5>
                        For example, you will be able to find a list of a pizza restaurants close to you. And you will be able to check their
                        ratings and reviews posted by other users. And of course, you can post your own reviews and experience of
                        a certain restaurant you just visited.
                    </h5>
                    <h5>
                        You can also following other users you find interesting and view their activities, like which coffee shops they have
                        been to recently and view their reviews on them.
                    </h5>
                    <h5>
                        Business info such as address and contact on our website are fetched from Yelp API.
                    </h5>
                </div>
            </div>
            <SecureContent>
                <div className="container mt-3 border-light border-2 border">
                    <h1>
                        Restaurants near me
                    </h1>
                    <ul className="list-group">
                        {
                            restaurants.map(bus =>
                                <li className="list-group-item row">
                                    <img src={bus.image_url} className="me-2 mt-2 col-2 float-start" height={130}/>
                                    <div className="col-9">
                                        <Link to={`/details/${bus.id}`}>
                                            {bus.name}
                                        </Link>
                                        <div>
                                            Yelp rating: {bus.rating}
                                        </div>
                                        <div>
                                            Address: {bus.location.display_address.join(', ')}
                                        </div>
                                        <div>
                                            Phone: {bus.display_phone}
                                        </div>
                                        <div>
                                            Price: {bus.price}
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </SecureContent>
        </div>
    )
}

export default HomeScreen;