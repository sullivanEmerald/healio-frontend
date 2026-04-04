export interface Worker {
    name: string;
    skills: string[];
    isAvailable: boolean;
    status: string;
    country: string;
    state: string;
    jobsCompleted: number;
    rating: number;
    id: string;
}

export interface Job {
    _id: string;
    title: string;
    providerId?: { _id: string; firstName: string, lastName: string };
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: string;
    amount: number;
    paymentFrequency: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    requiredSkills: string[];
    clientName: string;
    enhancedDBS?: boolean,
    experience?: string;
    language?: string;
    shiftType?: string;
    skills?: string;
    state: string

}


export interface ProjectSummaryProps {
    projectData: Record<string, number>;
}


export type CarerShiftApplication = {
    _id: string;
    createdAt?: string;
    shiftId: Job
}