

export type CarerMiniProfileType = {
    _id: string,
    firstName: string,
    lastName?: string,
}


export type DashboardOverview = {
    pending: number,
    published: number,
    inProgress: number,
    completed: number,
    assigned: number,
    approved: number,
    paid: number,
    totalWorkers?: number,
    totalShifts?: number,
    upcomingShifts?: number,
}