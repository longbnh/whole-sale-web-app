import {SHOP_API} from "../components/enum";
import axiosClient from "./axiosClient";
import IOrigin from "../components/models/IOrigin";

const originApi = {
    getOrigin: () => {
        const url = SHOP_API.Origin;
        return axiosClient.get<IOrigin[]>(url);
    },
};

export default originApi;