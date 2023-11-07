import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await Auth.currentAuthenticatedUser();
            } catch (error) {
                // If there is no authenticated user, redirect to the login page
                router.push('/login');
            }
        };

        checkAuthStatus();
    }, [router]);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export default Dashboard;
