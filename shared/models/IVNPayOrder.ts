import {IMilestone} from "./IMilestone";

export interface IVNPayOrder {
    "id": number,
    "receiverName": string,
    "phoneNumber": string,
    "detailAddress": string,
    "ward": string,
    "district": string,
    "city": string,
    "priceEach": number,
    "quantity": number,
    "totalPrice": number,
    "paymentType": string,
    "paymentUrl": string,
    "status": number,
    "campaign": {
        "id": number,
        "startDate": string,
        "endDate": string,
        "imageUrl": string
        "currentSaleQuantity": number,
        "inStockQuantity": number,
        "status": number,
        "mileStones": IMilestone[],
    }
}