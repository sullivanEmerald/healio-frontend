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

export const updateProviderDetails = async (details: any) => {
    try {
        const response = await axiosInstance.put("/provider/profile", details);
        return response.data;
    } catch (error: any) {
        showToaster(error?.response?.data?.message || "An error occurred while updating profile. Please try again.");
        throw error;
    }
};

