export type RegisterData = {
    firstName: string;
    lastName: string;
    businessEmail: string;
    phoneNumber: string;
    password: string;
    confirmPassword?: string;
};


export type User = {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isVerified: boolean;
};

export type Provider = {
    firstName: string;
    lastName: string;
    businessEmail: string;
    phoneNumber: string;
}
