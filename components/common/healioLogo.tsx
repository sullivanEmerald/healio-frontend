import logo from '../../public/healioLogo.png';
import Image from 'next/image';
export const HealioLogo = () => {
    return (
        <Image src={logo} alt="Healio Logo" width={100} height={100} />
    );
};
