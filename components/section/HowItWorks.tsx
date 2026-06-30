import { BriefcaseBusiness, MailCheck, Wallet } from "lucide-react"
const procedures = [
    {
        title: "Create shift",
        description: "Create an account, create shift and it becomes available at the marketplace for carer",
        icon: <BriefcaseBusiness />
    },
    {
        title: "Approve carer application",
        description: "Review a carer application for shift assignment and approve. Agree on payment terms",
        icon: <MailCheck />
    },
    {
        title: "Shift Revision",
        description: "On shift completion, review job done and accepted. The carer recieves a payout",
        icon: <Wallet />
    },
]
export default function HowItWork() {
    return (
        <section className="space-y-10 bg-gray-900 px-8 py-12">
            <main className="flex flex-col items-center">
                <h2 className="text-3xl font-bold">How It Works</h2>
                <span className="text-muted-foreground">Create shift and assign to a carer</span>
            </main>
            <section className="grid grid-col-1 sm:grid-cols md:grid-cols-3 gap-4">
                {procedures.map((process, idx) => (
                    <div key={idx} className="relative flex flex-col gap-4 items-center border border-gray-700 rounded-lg bg-gray-730 p-6">
                        <div className="bg-primary text-white p-2 rounded-full">
                            {process.icon}
                        </div>
                        <span className="text-lg">{process.title}</span>
                        <span className="text-center text-muted-foreground">{process.description}</span>
                        <p className="absolute right-2 top-2 text-muted-foreground/60 font-bold text-lg">0{idx + 1}</p>
                    </div>
                ))}
            </section>
        </section>
    )
}