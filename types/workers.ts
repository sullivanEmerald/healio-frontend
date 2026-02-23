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
    id: string;
    providerId: string;
    name: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: string;
    amount: number;
    paymentStructure: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    requiredSkills: string[];
    clientName: string;
}


export interface ProjectSummaryProps {
    projectData: Record<string, number>;
}