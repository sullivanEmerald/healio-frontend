import { Shift } from "@/types/shifts";
import { axiosInstance } from "@/lib/utils";
import { showToaster } from "@/lib/utils";


export const CreateShift = async (shift: Shift) => {
    try {
        const response = await axiosInstance.post("/provider/shifts", shift);
        return response.data;
    } catch (error: any) {
        console.error(error);
        showToaster(error?.response?.data?.message || "An error occurred while creating the shift. Please try again.");
        throw error;
    }
};


