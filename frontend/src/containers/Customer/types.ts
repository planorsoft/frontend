export interface Customer {
    id: number | null;
    name: string;
    isCompany: boolean;
    address?: string;
    city?: string;
    district?: string;
    postCode?: string;
    country?: string;
    phoneNumber?: string;
    website?: string;
    governmentId?: string;
    currencyCode?: string;
    isPotantial: boolean;
}

export interface Contact {
    name: string;
    email: string;
}