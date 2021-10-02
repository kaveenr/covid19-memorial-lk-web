import { useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";
import { useTranslations } from "use-intl";

const geo = require(`../data/geo_latest.json`);

const initialState = {
    init: true,
    province: undefined,
    district: undefined,
    city: undefined,
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
        case "PROVINCE":
            return {
                ...state,
                province: action.value,
                district: undefined,
                city: undefined
            }
        case "DISTRICT":
            return {
                ...state,
                district: action.value,
                city: undefined
            }
        case "CITY":
            return {
                ...state,
                city: action.value
            }
    }
}

const Filter = ({ setFilter }) => {

    const { locale } = useRouter();
    const [filter, dispatch] = useReducer(reducer, initialState);
    const t = useTranslations('filter');

    useEffect(() => {
        if (!filter.init) {
            setFilter(filter);
        }
    }, [filter]);

    return (
        <div className="collapse collapse-arrow px-0 py-0">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">
                {t('title')}
            </div>
            <div className="collapse-content">
                <div className="flex flex-col lg:flex-row gap-3">
                    <select className="select select-bordered "
                        value={filter.province || "default"}
                        defaultValue={"default"}
                        onChange={event => {
                            dispatch({ type: "PROVINCE", value: event.target.value })
                        }}>
                        <option disabled="disabled" value={"default"}>{t('province')}</option>
                        {geo.provinces.map((d) => (<option key={d.id} value={d.id}>{d[`name_${locale}`]}</option>))}
                    </select>
                    <select className="select select-bordered " disabled={!filter.province}
                        value={filter.district || "default"}
                        defaultValue={"default"}
                        onChange={event => {
                            dispatch({ type: "DISTRICT", value: event.target.value })
                        }}>
                        <option disabled="disabled" value={"default"}>{t('district')}</option>
                        {geo.districts.filter(i => (i.province_id == filter.province)).map((d) => (<option key={d.id} value={d.id}>{d[`name_${locale}`]}</option>))}
                    </select>
                    <select className="select select-bordered " disabled={!filter.district}
                        defaultValue={"default"}
                        value={filter.city || "default"}
                        onChange={event => {
                            dispatch({ type: "CITY", value: event.target.value })
                        }}>
                        <option disabled="disabled" value={"default"}>{t('city')}</option>
                        {geo.cities.filter(i => (i.district_id == filter.district)).filter((d) => (d[`name_${locale}`])).map((d) => (<option key={d.id} value={d.id}>{d[`name_${locale}`]}</option>))}
                    </select>
                    <select className="select select-bordered"
                        defaultValue={"default"}
                        value={filter.ageRange ? filter.ageRange  : "default"}
                        onChange={event => {
                            dispatch({ type: "AGE", value: event.target.value })
                        }}>
                        <option disabled="disabled" value={"default"}>{t('age')}</option>
                        <option value="0-30">{t('ageRangeBelow30')}</option>
                        <option value="30-59">{t('ageRangeBetween30and59')}</option>
                        <option value="60-120">{t('ageRange60above')}</option>
                    </select>
                    <select className="select select-bordered"
                        defaultValue={"default"}
                        value={filter.gender ? filter.gender  : "default"}
                        onChange={event => {
                            dispatch({ type: "GENDER", value: event.target.value })
                        }}>
                        <option disabled="disabled" value={"default"}>{t('gender')}</option>
                        <option value="Male">{t('genderMale')}</option>
                        <option value="Female">{t('genderFemale')}</option>
                    </select>
                    <button className="btn " onClick={() => dispatch({ type: "RESET"})}>
                        <FontAwesomeIcon icon={faTimes} size="1x" className="mr-2" />
                        {t('resetFilters')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;