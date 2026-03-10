import React from 'react';
import Image from 'next/image';
import ProviderImage from '@/public/images/shifts.png';

export default function HeroSection() {
    return (
        <section className='flex flex-col md:flex-row gap-12 items-center py-8'>

            <div className='flex-1 flex flex-col justify-center'>
                <h1
                    className="text-4xl sm:text-5xl font-extrabold text-primary"
                    role="heading"
                    aria-level={1}
                >
                    Find and Deploy<br />
                    <span className="text-secondary block mt-2">Skilled Professionals</span>
                    <span className="block mt-1">on Demand</span>
                </h1>
                <p className="body-text mt-4 max-w-xl mx-auto md:mx-0">
                    Healio connects care providers with qualified professionals, making it easy to create, manage, and fill shifts—streamlining healthcare staffing for organizations of any size.
                </p>

                {/* <div className="mt-6 flex justify-center md:justify-start">
                    <ScrollLink
                        to="wait-form"
                        smooth={true}
                        offset={-80}
                        duration={500}
                        className="cursor-pointer"
                    >
                        <MyButton
                            data-testid="hero-get-started"
                            aria-label="Get Started"
                            className="bg-primary text-white hover:bg-primaryDark px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Get Started
                        </MyButton>
                    </ScrollLink>
                </div> */}
            </div>
            <div className="max-w-[500px] w-full shadow-lg py-4 rounded-lg">
                <Image
                    src={ProviderImage}
                    alt="Provider Image"
                    layout="responsive"
                    priority
                    width={700}
                    height={475}
                    className="object-contain w-full h-auto"
                />
            </div>
        </section>
    );
}





