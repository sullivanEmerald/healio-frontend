import { axiosInstance } from "@/lib/utils"; import { RegisterData } from "@/types/users";
import { showToaster } from "@/lib/utils";


export const fetchMarketplaceShifts = async () => {
    try {
        const response = await axiosInstance.get('/carer/marketplace');
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch marketplace shifts", error);
        showToaster(error.response?.data?.message || "Failed to fetch marketplace shifts", "error");
        throw error;
    }
};
