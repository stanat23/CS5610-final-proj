import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/search-bar";
import Nav from "../components/nav";
import * as bookmarkService from "../services/bookmark-service";
import {useProfile} from "../context/profile-context";
const BASE_DETAIL_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses";
const YELP_API_KEY = 'OEWy2lxOSpGjMw-12D4Rw2M7P2KID4hcc6rEoLpVUPQu91uYpf9n194fzmKh8mWIyIgyINuFzDX0NfYGO60bwvPEcXGob_TfkLLQMcqO5PFR6fC0r9vyaoylm2dTYnYx';

const YelpDetails = () => {
    const {profile} = useProfile()
    const [businessDetails, setBusinessDetails] = useState({})
    const [bookmarkBusinessDetails, setBookmarkBusinessDetails] = useState({})
    const {businessId} = useParams();
    const currEmail = profile.email
    const currUid = profile.uid
    const followed = async () => {
        const currUserBookmarks = await bookmarkService.findUserBookmarks(currEmail)
        return currUserBookmarks.includes(businessId)
    }
    const handleBookmark = async () => {
        const currUserBookmarks = await bookmarkService.findUserBookmarks(currEmail)
        if (!followed) {
            await bookmarkService.addBookmark(currUid, businessId, currUserBookmarks)
        } else {
            await bookmarkService.deleteBookmark(currUid, businessId, currUserBookmarks)
        }
    }
    const searchBusinessById = async () => {
        const response = await axios.get(`${BASE_DETAIL_URL}/${businessId}`,
            {headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`,
                }});
        setBusinessDetails(response.data);
    }
    useEffect(()=>{
        searchBusinessById();
    }, []);
    return (
        <div className="container row">
            <SearchBar/>
            <div className="col-2">
                <Nav/>
            </div>
            <div className="col-10">
                <div className="row">
                    <img
                        className="ms-2 mt-4 col-2 float-end"
                        src={businessDetails.image_url}
                        height={180}/>
                    <div className="row col-10">
                        <h1 className="ms-2 mt-2">{businessDetails.name}</h1>
                        <p>
                            <div className="ms-2">Rating: {businessDetails.rating || ""}</div>
                            <div className="ms-2">Price: {businessDetails.price || ""}</div>
                            <div className="ms-2">Address: {"to be updated"}</div>
                            <div className="ms-2">Phone Number: {businessDetails.display_phone || ""}</div>
                        </p>
                        <button
                            className="btn btn-primary ms-3 col-4"
                            onClick={handleBookmark}>Add to Bookmark</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YelpDetails;