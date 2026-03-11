import { useState, useEffect } from 'react';
import { User } from '@/types/users';
import { getUserProfile } from '@/services/user';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getUserProfileData = async () => {
            if (!localStorage.getItem('token')) {
                setTimeout(() => setIsLoading(false), 300);
                return;
            }
            try {
                const payload = JSON.parse(atob(localStorage.getItem('token')!.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);

                if (payload.exp < currentTime) {
                    throw new Error("Token has expired");
                }
                const user = await getUserProfile();
                setUser(user);
                localStorage.setItem('id', user?.id);
                localStorage.setItem('email', user?.email);
                localStorage.setItem('fullName', user?.fullName);
                localStorage.setItem('role', user?.role);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // localStorage.removeItem('token');
                // localStorage.removeItem('userRole');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfileData();
    }, []);

    return { user, isLoading, setIsLoading };
}