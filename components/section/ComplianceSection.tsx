import React from 'react';

export default function ComplianceSection() {
    return (
        <section className="w-full py-16 bg-transparent">
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-8">Safeguarding & Compliance</h2>
            <div className="max-w-3xl mx-auto text-center text-[#0C287B]">
                <p className="mb-4 opacity-80">DBS (Disclosure & Barring Service) compliance is at the heart of Healio. Carers must declare and verify their DBS status, and providers confirm verification at the first shift. All actions are timestamped for auditability. No sensitive documents are stored on the platform.</p>
                <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
                    <div className="flex-1 bg-white rounded-lg p-6 border border-[#0C287B]/10">
                        <h3 className="font-semibold text-[#0C287B] mb-2">DBS Status</h3>
                        <ul className="text-left list-disc list-inside text-[#0C287B] opacity-80">
                            <li>Declared</li>
                            <li>Physically Verified</li>
                            <li>Rejected</li>
                            <li>Expired</li>
                            <li>False Declaration (Admin action)</li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-6 border border-[#0C287B]/10">
                        <h3 className="font-semibold text-[#0C287B] mb-2">Audit & Security</h3>
                        <ul className="text-left list-disc list-inside text-[#0C287B] opacity-80">
                            <li>All key actions timestamped</li>
                            <li>No storage of raw identity/DBS docs</li>
                            <li>Manual admin controls for surcharges</li>
                            <li>Platform built for trust & compliance</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
