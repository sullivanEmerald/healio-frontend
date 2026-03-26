import { axiosInstance } from "@/lib/utils"; import { RegisterData } from "@/types/users";
import { showToaster } from "@/lib/utils";
import { FilterState } from "@/app/carer/marketplace/page";


export const fetchMarketplaceShifts = async (filters: FilterState) => {
    try {
        const response = await axiosInstance.get('/carer/marketplace', { params: filters });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch marketplace shifts", error);
        showToaster(error.response?.data?.message || "Failed to fetch marketplace shifts", "error");
        throw error;
    }
};

export const applyForShift = async (shiftId: string) => {
    try {
        const response = await axiosInstance.post(`/carer/apply/${shiftId}`);
        return response.data;
    } catch (error: any) {
        console.error("Failed to apply for shift", error);
        showToaster(error.response?.data?.message || "Failed to apply for shift", "error");
        throw error;
    }
};
