

export type ShiftStatus = "draft" | "published" | "assigned" | "inprogress" | "completed" | "approved" | "paid";

export type Shift = {
  title: string;
  postcode: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  shiftType: string;
  numberOfCarers: number;
  description: string;
  skills: string;
  experience: string;
  genderPreference: string;
  language: string;
  enhancedDBS: boolean;
  rightToWork: boolean;
  amount: string;
  expenses: string;
  paymentFrequency: string;
  status: ShiftStatus;
  _id: string;
};

export type ShiftWithApplications = {
  shift: Shift,
  applications: any
}

export type ShiftWithCarerDetails = Shift & {
  assignedCarerId: {
    firstName: string;
    lastName: string;
    _id: string;
  } | null;
}; 