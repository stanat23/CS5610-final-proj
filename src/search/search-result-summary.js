import {useParams} from "react-router-dom";

const SearchResultSummary = () => {
    const {businessSearch, locationSearch} = useParams();
    return (
        <div className="container">
            <div className="float-start" style={{fontSize:16}}><strong>{businessSearch}</strong> near {locationSearch}</div>
            <div className="float-end">showing 1-20 of 300 results</div>
        </div>
    );
};

export default SearchResultSummary;