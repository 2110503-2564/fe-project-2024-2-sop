export interface VenueItem {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
    dailyrate: number;
    __v: number;
    id: string;
}

export interface VenueJson {
    success: boolean;
    count: number;
    pagination: object;
    data: VenueItem[];
}

export interface VenueResponse {
    success: boolean;
    data: VenueItem;
}

export interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
}
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
    tel?: string;          // Make tel optional
    affiliate?: string;    // Make affiliate optional
    password?: string;
    image? : string;     // Make password optional
    createdAtts?: any[];   // Make createdAtts optional
  }
  