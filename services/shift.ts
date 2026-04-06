import { Shift, ShiftWithCarerDetails } from "@/types/shifts";
import { axiosInstance } from "@/lib/utils";
import { showToaster } from "@/lib/utils";
import { ShiftWithApplications } from "@/types/shifts";


export const CreateShift = async (shift: any) => {
    try {
        const response = await axiosInstance.post("/provider/shifts", shift);
        return response.data;
    } catch (error: any) {
        console.error(error);
        showToaster(error?.response?.data?.message || "An error occurred while creating the shift. Please try again.");
        throw error;
    }
};

export const getAllShifts = async (): Promise<ShiftWithCarerDetails> => {
    try {
        const response = await axiosInstance.get("/provider/shifts");
        console.log("All shifts response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error(error);
        showToaster(error?.response?.data?.message || "An error occurred while fetching shifts. Please try again.");
        throw error;
    }
};

export const getShiftById = async (id: string): Promise<ShiftWithApplications> => {
    try {
        const response = await axiosInstance.get(`/provider/shifts/${id}`);
        console.log("Shift details response:", response.data);
        return response.data;
    } catch (error: any) {
        showToaster(error?.response?.data?.message || "An error occurred while fetching the shift. Please try again.");
        throw error;
    }
};

export const approveApplicationAPI = async (applicationId: string) => {
    try {
        const response = await axiosInstance.post(`/provider/applications/${applicationId}/approve`);
        return response.data;
    } catch (error: any) {
        showToaster(error?.response?.data?.message || "An error occurred while approving the application. Please try again.");
        throw error;
    }
};

export const verifyShift = async (assignmentId: string) => {
    try {
        const response = await axiosInstance.post(`/provider/assignment/${assignmentId}/review`);
        return response.data;
    } catch (error: any) {
        showToaster(error?.response?.data?.message || "An error occurred while verifying the shift. Please try again.");
        throw error;
    }
};


export const updateShift = async (shift: Shift) => {
    try {
        const response = await axiosInstance.put(`/provider/shifts/${shift._id}`, shift);
        return response.data;
    } catch (error: any) {
        showToaster(error?.response?.data?.message || "An error occurred while updating the shift. Please try again.");
        throw error;
    }
};