import { SHOP_API } from "../shared/enum/enum";
import IOrigin from "../shared/models/IOrigin";
import axiosClient from "./axiosClient";
import {IAddress} from "../shared/models/IAddress";

const addressApi = {
    getAddresses: () => {
        const url = SHOP_API.Address;
        return axiosClient.get<IAddress[]>(url);
    },
};

export default addressApi;