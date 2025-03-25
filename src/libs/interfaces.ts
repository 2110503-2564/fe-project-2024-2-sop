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
    success: boolean;
    data: {
        _id: string;
        name: string;
        email: string;
        role: string;
        token: string;
        tel?: string;
        affiliate?: string;
        password?: string;
        image?: string;
        createdAt?: string;
    };
}

// export interface Company {
//     _id: string;
//     name?: string;
//     address?: string;
//     tel?: string;
//     website?: string;
//     id?: string;
// }

export interface Company {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    country: string;
    postalcode: string;
    tel: string;
    email: string;
    website: string;
    business_type: string;
    description: string;
    company_size: string;
    company_picture: string;
}

export interface CompanyCatalogProps {
    companyJson: {
        count: number;
        data: Company[];
    };
    selectedSize: string;
}


export interface InterviewSession {
    _id: string;
    sessionName?: string;
    jobPosition?: string;
    jobDescription?: string;
    id?: string;
}

export interface Booking {
    _id: string;
    bookingDate: string;
    user: User | string;
    company: Company | string;
    interviewSession: InterviewSession | string;
    interviewsessions?: InterviewSession[];
    createdAt: string;
    id?: string;
}
export interface ApiResponse {
    success: boolean;
    count: number;
    pagination: object;
    data: Booking[];
    message: string;
}

export interface SessionItem {
    _id: string;
    sessionName: string;
    jobPosition: string;
    jobDescription: string;
    startDate: Date;
    endDate: Date;
    company: string;
    companiess: SessionCompanyContact;
    __v: number;
    id: string;
}

export interface SessionCompanyContact{
    _id:string;
    name:string;
    tel:string;
    email:string;
    website:string;
    id:string;
}

export interface SessionResponse {
    success: boolean;
    data: SessionItem[];
}

export interface input {
    company: string;
    user: string;
    bookingDate: string;
    interviewSession: string;
}