import React, {useContext, useState} from "react";

const SearchContext = React.createContext()

export const SearchProvider = ({children}) => {
    const [term, setTerm] = useState()
    const [location, setLocation] = useState()
    const [businesses, setBusinesses] = useState()

    const updateTerm = (t) => {
        setTerm(t);
    }

    const updateLocation = (l) => {
        setLocation(l);
    }

    const updateBusinesses = (bs) => {
        setBusinesses(bs);
    }

    const value = {term, updateTerm, location, updateLocation, businesses, updateBusinesses}
    return(
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return useContext(SearchContext)
}