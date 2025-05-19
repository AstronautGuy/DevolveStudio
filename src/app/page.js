// pages/google-auth.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '/supabaseClient'; // Adjust the path if necessary

const GoogleAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                setError(sessionError.message);
            } else {
                setUser(session?.user ?? null);
            }
            setLoading(false);
        };

        fetchSession();

        // Listen for changes in authentication state
        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        // Cleanup subscription on unmount
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) {
            setError(error.message);
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setError(error.message);
        } else {
            setUser(null);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Google Authentication</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user ? (
                <div>
                    <h2>Welcome, {user.email}</h2>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            )}
        </div>
    );
};

export default GoogleAuth;