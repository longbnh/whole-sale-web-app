export interface IAddressUnit {
    id: number,
    name: string,
    divisionType: string,
}

export interface IAddress {
    id: number;
    detailAddress: string,
    latitude: 0,
    longitude: 0,
    ward: IAddressUnit
    district: IAddressUnit
    city: IAddressUnit
    receiverName: string,
    phoneNumber: string,
    addressType: number,
    isPrimary: boolean,
    status: number,
}