import { getStatusColor, getIcon } from "@/data/constants";

export default function AnalyticsOverview() {

    const analytics = {
        directInvitations: 0,
        completed: 0,
        assigned: 0,
        inProgress: 0,
        applied: 0,
        pending: 0,
        approved: 0,
        paid: 0,
    };

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(analytics).map(([key, value], idx) => {
                    const getColor = getStatusColor(key);
                    const Icon = getIcon(key);
                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-6 rounded-2xl px-6 py-8 shadow-md hover:shadow-lg transition min-h-[150px]"
                            style={{ backgroundColor: getColor }}
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20">
                                <Icon size={26} className="text-white" />
                            </div>

                            <div className="text-white">
                                <p className="text-sm opacity-80 mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </p>
                                <p className="text-3xl font-bold">
                                    {value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}