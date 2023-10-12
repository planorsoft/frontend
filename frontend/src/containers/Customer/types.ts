export interface Customer {
    id: number | null;
    name: string | null;
    isCompany: boolean | null;
    address: string | null;
    city: string | null;
    district: string | null;
    postCode: string | null;
    country: string | null;
    phoneNumber: string | null;
    website: string | null;
    governmentId: string | null;
    currency: string | null;
    isPotantial: boolean | null;
}

export interface CustomerUpsert {
    id: number | null;
    name: string | null;
    isCompany: boolean | null;
    address: string | null;
    city: string | null;
    district: string | null;
    postCode: string | null;
    country: string | null;
    phoneNumber: string | null;
    website: string | null;
    governmentId: string | null;
    currency: string | null;
    isPotantial: boolean | null;
}

export interface CustomerDelete {
    id: string;
}
    