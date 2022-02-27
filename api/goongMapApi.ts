import axiosGoongMap from "./axiosGoongMap";
import {GOONG_PATH} from "../shared/enum/enum";
import {IPlaceDetail, IPrediction} from "../shared/models/goongMap/IPrediction";

const basePath = GOONG_PATH.PLACE;

const goongMapApi = {
    searchByKeyword: (searchValue: string) => {
        let param = {
            api_key: process.env.MAP_API_KEY,
            input: searchValue,
        }
        const url = basePath.AUTOCOMPLETE;
        return axiosGoongMap.get<IPrediction>(url, {params: param})
    },
    getPlaceDetail: (place_id: string) => {
        let param = {
            api_key: process.env.MAP_API_KEY,
            place_id: place_id,
        }
        const url = basePath.DETAIL;
        return axiosGoongMap.get<IPlaceDetail>(url, {params: param})
    }
}
export default goongMapApi;