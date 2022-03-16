import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
const imageApi = {
    uploadImage: (images: File[]) => {
        const url = `${SHOP_API.Image}`;
        const formData = new FormData();
        images.forEach(img => {
            formData.append("files", img)
        })
        return axiosClient.post<string[]>(url, formData, config)
    }
}
export default imageApi;