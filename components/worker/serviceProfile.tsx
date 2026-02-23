import CustomDrawer from "../common/drawer";
import DisplayAvatar from "../common/avatar";
import Button from "@/components/common/button";
import { Job } from "@/types/workers";
import moment from "moment";
import Underline from "../common/underline";

export default function WorkerProfile({ show, onHide, job }: { show: boolean; onHide: () => void; job: Job }) {
    return (
        <CustomDrawer show={show} onHide={onHide} header={`${job.name}`}>
            <main className="space-y-4 p-4 flex flex-col h-full">
                <div className="flex items-center gap-4">
                    <DisplayAvatar name={job.name} />
                </div>
                <p className="text-gray-700 mb-2 line-clamp-3">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-[#140f30]/10 text-[#140f30]"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <span className="text-sm text-red-500 font-semibold">{job.location}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-primary">${job.amount}</span>
                    <span className="text-xs bg-green-100 px-2 py-1 rounded text-gray-700">{job.paymentStructure}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Client:</span>
                    <span className="text-sm font-medium text-gray-800">{job.clientName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Posted</span>
                    <span className="text-sm font-medium text-gray-800">{moment(job.createdAt).fromNow()}</span>
                </div>
                <Underline />
                <div>
                    <p className="font-semibold text-primary/80 text-lg">Scheduling Details:</p>
                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                        <div><span className="font-semibold">Start Date:</span> {moment(job.startDate).format('MMMM Do YYYY')}</div>
                        <div><span className="font-semibold">Expected Date Of Completion:</span> {moment(job.endDate).format('MMMM Do YYYY')}</div>
                        <div><span className="font-semibold">Working Hours:</span> {moment(job.startTime, 'HH:mm').format('h:mm A')} - {moment(job.endTime, 'HH:mm').format('h:mm A')}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 pb-6 w-full self-end mt-auto">
                    <Button onClick={onHide} className="w-1/2">
                        Close
                    </Button>
                    <Button className="w-1/2" onClick={onHide}>
                        {'Apply'}
                    </Button>
                </div>
            </main>
        </CustomDrawer>
    );
}