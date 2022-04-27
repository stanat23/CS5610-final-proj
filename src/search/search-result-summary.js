import {useParams} from "react-router-dom";
import {useSearch} from "../context/search-context";

const SearchResultSummary = () => {
    const {businessSearch, locationSearch} = useParams();
    const {businesses} = useSearch();
    return (
        <div className="container">
            <div className="float-start" style={{fontSize:16}}><strong>{businessSearch}</strong> near {locationSearch}</div>
            <div className="float-end">showing 1-20 of 100 results</div>
        </div>
    );
};

export default SearchResultSummary;