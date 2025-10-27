export interface Food {
    food: FoodElement[];
}

export interface FoodElement {
    id: number;
    user: string;
    title: string;
    date: string;
}


export interface CheckUser {
    authenticated: boolean;
    user:          User;
}

export interface User {
    id:                 string;
    aud:                string;
    role:               string;
    email:              string;
    email_confirmed_at: Date;
    phone:              string;
    confirmed_at:       Date;
    last_sign_in_at:    Date;
    app_metadata:       AppMetadata;
    user_metadata:      UserMetadata;
    identities:         Identity[];
    created_at:         Date;
    updated_at:         Date;
    is_anonymous:       boolean;
}

export interface AppMetadata {
    provider:  string;
    providers: string[];
}

export interface Identity {
    identity_id:     string;
    id:              string;
    user_id:         string;
    identity_data:   IdentityData;
    provider:        string;
    last_sign_in_at: Date;
    created_at:      Date;
    updated_at:      Date;
    email:           string;
}

export interface IdentityData {
    email:          string;
    email_verified: boolean;
    phone_verified: boolean;
    sub:            string;
}

export interface UserMetadata {
    email_verified: boolean;
}
