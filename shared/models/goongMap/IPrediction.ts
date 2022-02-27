//Places Search by keyword with autocomplete
export interface IPlace {
    description: string;
    place_id: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
    }
    score: number;
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