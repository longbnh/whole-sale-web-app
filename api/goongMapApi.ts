import axiosGoongMap from "./axiosGoongMap";
import {GOONG_PATH} from "../shared/enum/enum";
import {IForwardGeoPlace, IPlaceDetail, IPrediction} from "../shared/models/goongMap/IPrediction";

const place = GOONG_PATH.PLACE;
const geocode = GOONG_PATH.GEOCODING;

const goongMapApi = {
    searchByKeyword: (searchValue: string) => {
        let param = {
            api_key: process.env.MAP_API_KEY,
            input: searchValue,
        }
        const url = place.AUTOCOMPLETE;
        return axiosGoongMap.get<IPrediction>(url, {params: param})
    },
    getPlaceDetail: (place_id: string) => {
        let param = {
            api_key: process.env.MAP_API_KEY,
            place_id: place_id,
        }
        const url = place.DETAIL;
        return axiosGoongMap.get<IPlaceDetail>(url, {params: param})
    },
    getForwardGeocoding: (searchValue: string) => {
        let param = {
            api_key: process.env.MAP_API_KEY,
            address: searchValue,
        }
        const url = geocode.FORWARD;
        return axiosGoongMap.get<IForwardGeoPlace>(url, {params: param})
    }
}
export default goongMapApi;