import {useEffect, useState} from "react";
import get from './api';

const useBusinessSearch = (term, location) => {
    const [businesses, setBusinesses] = useState([]);
    const [searchTerm, setSearchTerm] = useState(term);
    const [searchLocation, setSearchLocations] = useState(location);
    useEffect(() => {
        setBusinesses([]);
        const fetchData = async () => {
            try {
                const rawData = await get(searchTerm, searchLocation);
                const res = await rawData.json();
                setBusinesses(res.businesses);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [searchTerm, searchLocation]);
    return [setSearchTerm, setSearchLocations];
}

export default useBusinessSearch;