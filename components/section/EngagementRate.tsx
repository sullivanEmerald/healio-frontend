
const serviceUsage = [
    {
        label: 'Providers Available',
        number: '100+',
    },
    {
        label: 'Works Available',
        number: '200+',
    },
    {
        label: 'Shifts Completed',
        number: '1000+',
    },
    {
        label: 'Payouts Completed',
        number: '50M+',
    }
]

export default function EngagementRate() {
    return (
        <section className="flex flex-col sm:flex-row justify-between px-20 py-8 border-t border-b border-gray-700">
            {serviceUsage.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <span className="text-2xl">{item.number}</span>
                    <span className="text-gray-500">{item.label}</span>
                </div>
            ))}
        </section>
    )
}