import {ADDRESS, SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IAddress, IAddressUnit} from "../shared/models/IAddress";

const addressApi = {
    getAddresses: () => {
        const url = SHOP_API.Address;
        return axiosClient.get<IAddress[]>(url);
    },
    getCities: () => {
        const url = ADDRESS.CITIES;
        return axiosClient.get<IAddressUnit[]>(url);
    },
    getDistricts: (cityId: number) => {
        const url = `${ADDRESS.CITIES}/${cityId}/${ADDRESS.DISTRICT}`;
        return axiosClient.get<IAddressUnit[]>(url);
    },
    getWards: (districtId: number) => {
        const url = `${ADDRESS.DISTRICT}/${districtId}/${ADDRESS.WARD}`;
        return axiosClient.get<IAddressUnit[]>(url);
    },
    createAddress: (address: IAddress) => {
        const url = `${SHOP_API.Address}`;
        return axiosClient.post(url, address);
    }
};

export default addressApi;
