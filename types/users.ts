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
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isVerified: boolean;
};
