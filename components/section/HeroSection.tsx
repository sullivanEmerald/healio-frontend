import React from 'react';
import Image from 'next/image';
import ProviderImage from '@/public/images/greenBackground.png';
import { AvatarUsers } from './avatar';
import Button from '../common/button';

export default function HeroSection() {
    return (
        <section className='w-full flex flex-col md:flex-row items-start justify-between px-4 sm:px-8 mb-20 relative'>
            <div className='flex flex-col gap-4 w-full lg:w-1/2'>
                <h1
                    className="text-2xl sm:text-5xl font-bold text-primary"
                    role="heading"
                    aria-level={1}
                >
                    <span className='text-white'>Connet Your Home</span> With Professional Carers, Monitor{" "}
                    <span className="text-white">And{" "}</span><span className='primary'>Track Compliance.</span>
                </h1>
                <p className="text-muted-foreground text-md">
                    Healio connects care providers with qualified professionals, making it easy to create, manage and fill shifts—streamlining healthcare staffing for organizations of any size.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button className="">
                        Get Started
                    </Button>
                    <Button className="">
                        Learn More
                    </Button>
                </div>
                <div className="flex flex-row items-center gap-6 mt-6">
                    <AvatarUsers />
                    <p className='text-muted-foreground'>Trusted by <span className='text-white'>15,000+{" "}</span>users worldwide</p>
                </div>
            </div>
            <div className="hidden lg:flex w-full lg:w-1/2 justify-end">
                <Image
                    src={ProviderImage}
                    alt="Provider Image"
                    priority
                    height={500}
                    width={500}
                    className="object-cover w-[80%]"
                />
            </div>
        </section>
    );
}





