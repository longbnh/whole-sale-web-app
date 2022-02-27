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
    ward: IAddressUnit | number,
    district?: IAddressUnit | number,
    city?: IAddressUnit | number,
    receiverName: string,
    phoneNumber: string,
    addressType: number,
    isPrimary: boolean,
    status?: number,
}