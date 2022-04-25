import {useParams} from "react-router-dom";
import {useSearch} from "../context/search-context";

const SearchResultSummary = () => {
    const {businessSearch, locationSearch} = useParams();
    const {businesses} = useSearch();
    const len = Object.keys(businesses).length;
    return (
        <div className="container">
            <div className="float-start" style={{fontSize:16}}><strong>{businessSearch}</strong> near {locationSearch}</div>
            <div className="float-end">showing 1-20 of {len} results</div>
        </div>
    );
};

export default SearchResultSummary;