import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import Link from 'next/link';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const redirectToDashboardIfLoggedIn = async () => {
            try {
                await Auth.currentAuthenticatedUser();
                // If user is authenticated, redirect to the dashboard
                router.push('/dashboard');
            } catch {
                // If there's an error, it likely means no user is signed in
                // Stay on the home page
            }
        };

        redirectToDashboardIfLoggedIn();
    }, [router]);

    const handleLoginClick = () => {
        router.push('/login');
    };

    return (
        <div>
            <h1>Welcome to the App</h1>
            <button onClick={handleLoginClick}>Log In</button>
        </div>
    );
};

export default Home;
