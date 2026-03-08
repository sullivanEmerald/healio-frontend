import { axiosInstance } from "@/lib/utils";
import { RegisterData } from "@/types/users";
import { showToaster } from "@/lib/utils";


export const login = async (data: { email: string; password: string } & { role: string | null }) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response.data;
    } catch (error: any) {
        console.error("Login error:", error);
        showToaster(error.response?.data?.message || "Login failed. Please try again.", "error");
        throw error;
    }
};

export const register = async (data: RegisterData & { role: string }) => {
    try {
        const response = await axiosInstance.post('/auth/register', data);
        return response.data;
    } catch (error: any) {
        console.error("Registration error:", error);
        showToaster(error.response?.data?.message || "Registration failed. Please try again.", "error");
        throw error;
    }
};
