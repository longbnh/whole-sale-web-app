//Places Search by keyword with autocomplete
export interface ITerm {
    offset: number;
    value: string;
}
export interface IMatched {
    length: number;
    offset: number;
}
export interface IPlace {
    description: string;
    matched_substrings: [];
    place_id: string;
    reference: string;
    structured_formatting: {
        main_text: string;
        main_text_matched_substrings: IMatched[];
        secondary_text: string;
        secondary_text_matched_substrings: IMatched[];
    };
    terms: ITerm[];
    has_children: boolean;
    display_type: string;
    score: number;
    compound: {
        district: string;
        commune: string;
        province: string;
    }
    plus_code: {
        compound_code: string;
        global_code: string;
    },
}
export interface IPrediction {
    predictions: IPlace[];
    executed_time: number;
    executed_time_all: number;
    status: string;
}

//Get place detail by Id
export interface ILocation {
    location: {
        lat: number;
        lng: number;
    }
}
export interface IPlaceDetail {
    result: {
        place_id: string;
        geometry: ILocation;
        name: string;
    }
    status: string;
}

//Get place by geocode
export interface IGeoAddress {
    long_name: string;
    short_name: string;
}
export interface IGeoResult {
    address_components: IGeoAddress[];
    formatted_address: string;
    geometry: ILocation;
    place_id: string;
    reference: string;
    plus_code: {
        compound_code: string;
        global_code: string;
    },
    type: [];
}
export interface IForwardGeoPlace {
    plus_code: {};
    result: IGeoResult[];
}