import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";

const SearchResult = (props) => {
    return (
        <div>
            <ul className="list-group">
                {
                    props.businesses.map(bus =>
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

export default SearchResult;