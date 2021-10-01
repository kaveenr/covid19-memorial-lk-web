import { useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";

const geo = require(`../data/geo_latest.json`);

const initialState = {
    init: true,
    geoType: undefined,
    geoId: undefined,
    ageRange: undefined,
    gender: undefined,
};

const reducer = (pureState, action) => {
    const state = {
        ...pureState,
        init: false
    }
    switch (action.type) {
        case "RESET":
            return {
                ...initialState,
                init: false
            };
        case "GEO":
            const geoData = action.value.split("|");
            return {
                ...state,
                geoType: geoData[0],
                geoId: geoData[1]
            }
        case "AGE":
            return {
                ...state,
                ageRange: action.value
            }
        case "GENDER":
            return {
                ...state,
                gender: action.value
            }
    }
}

const Filter = ({ setFilter }) => {

    const { locale } = useRouter();
    const [filter, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!filter.init) {
            setFilter(filter);
        }
    }, [filter]);

    return (
        <div class="collapse collapse-arrow px-0 py-0">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
                Filter Results
            </div>
            <div className="collapse-content">
                <div className="flex flex-col lg:flex-row gap-4">
                    <select className="select select-bordered m-1"
                        value={filter.geoType ? `${filter.geoType}|${filter.geoId}` : "default"}
                        onChange={event => {
                            dispatch({ type: "GEO", value: event.target.value })
                        }}>
                        <option disabled="disabled" selected="selected" value={"default"}>Location</option>
                        <option disabled="disabled">{' '}</option>
                        <option disabled="disabled">Provinces</option>
                        {geo.provinces.map((d) => (<option value={`province|${d.id}`}>{d[`name_${locale}`]}</option>))}
                        <option disabled="disabled">{' '}</option>
                        <option disabled="disabled">Districts</option>
                        {geo.districts.map((d) => (<option value={`district|${d.id}`}>{d[`name_${locale}`]}</option>))}
                        <option disabled="disabled">{' '}</option>
                        <option disabled="disabled">Cities</option>
                        {geo.cities.filter((d) => (d[`name_${locale}`])).map((d) => (<option value={`city|${d.id}`}>{d[`name_${locale}`]}</option>))}
                    </select>
                    <select className="select select-bordered m-1"
                        value={filter.ageRange ? filter.ageRange  : "default"}
                        onChange={event => {
                            dispatch({ type: "AGE", value: event.target.value })
                        }}>
                        <option disabled="disabled" selected="selected" value={"default"}>Age</option>
                        <option value="0-30">Below 30</option>
                        <option value="30-59">Between 30 and 59</option>
                        <option value="60-120">60 years and above</option>
                    </select>
                    <select className="select select-bordered m-1"
                        value={filter.gender ? filter.gender  : "default"}
                        onChange={event => {
                            dispatch({ type: "GENDER", value: event.target.value })
                        }}>
                        <option disabled="disabled" selected="selected" value={"default"}>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <button class="btn m-1" onClick={() => dispatch({ type: "RESET"})}>
                        <FontAwesomeIcon icon={faTimes} size="1x" className="mr-2" />
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;