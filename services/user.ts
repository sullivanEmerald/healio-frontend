import { axiosInstance } from "@/lib/utils";
import { showToaster } from "@/lib/utils";


export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    } catch (error) {
        // showToaster("Error fetching user profile");
        throw error;
    }
};
