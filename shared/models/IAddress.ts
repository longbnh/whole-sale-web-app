export interface IAddressUnit {
    id: number,
    name: string,
    divisionType: string,
}

export interface IAddress {
    id?: number;
    detailAddress: string,
    latitude: number,
    longitude: number,
    ward?: IAddressUnit,
    wardId?: number;
    district?: IAddressUnit,
    city?: IAddressUnit,
    receiverName: string,
    phoneNumber: string,
    addressType: number,
    isPrimary: boolean,
    status?: number,
}