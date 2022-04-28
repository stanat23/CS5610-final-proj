import React from 'react';
import {Link} from "react-router-dom";
import {useSearch} from "../context/search-context";

const SearchResult = () => {
    const {businesses} = useSearch();
    if (!businesses) {
        return (
            <div>
                Sorry... We cannot find anything with your searching criteria
            </div>
        )
    }
    return (
        <div>
            <ul className="list-group">
                {
                    businesses.map(bus =>
                        <li className="list-group-item row">
                            <img src={bus.image_url} className="me-2 mt-2 col-2 float-start" height={130}/>
                            <div className="col-9">
                                <Link to={`/details/${bus.id}`}>
                                    {bus.name}
                                </Link>
                                <div>
                                    Yelp Rating: {bus.rating}
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
    );
};

export default SearchResult;