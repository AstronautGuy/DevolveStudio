'use client';
import { useState, useEffect } from 'react';
import { supabase } from '/supabaseClient';
//import { Input } from '@/components/ui/input'; // optional if you use shadcn/ui
import { Button } from '@/components/ui/Button';

const AuthPage = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) setError(sessionError.message);
            else setUser(session?.user ?? null);
            setLoading(false);
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener?.subscription?.unsubscribe?.();
        };
    }, []);

    const handleAuth = async () => {
        setError(null);
        const method = isSignup ? supabase.auth.signUp : supabase.auth.signInWithPassword;
        const { data, error } = await method({ email, password });

        if (error) setError(error.message);
        else setUser(data?.user ?? null);
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) setError(error.message);
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) setError(error.message);
        else setUser(null);
    };

    if (loading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6">
                <h1 className="text-3xl font-bold text-center">
                    {user ? 'Welcome 🎉' : isSignup ? 'Create an Account' : 'Welcome Back'}
                </h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {user ? (
                    <div className="text-center space-y-4">
                        <p className="text-gray-700">Logged in as <strong>{user.email}</strong></p>
                        <Button className="w-full" onClick={handleSignOut}>Sign Out</Button>
                    </div>
                ) : (
                    <>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button className="w-full" onClick={handleAuth}>
                            {isSignup ? 'Sign Up' : 'Log In'}
                        </Button>

                        <div className="flex items-center my-4">
                            <hr className="grow border-gray-300" />
                            <span className="mx-3 text-gray-500">OR</span>
                            <hr className="grow border-gray-300" />
                        </div>

                        <Button
                            onClick={handleGoogleSignIn}
                            className="w-full bg-white border text-black hover:bg-gray-100"
                        >
                            Sign in with Google
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <Button
                                onClick={() => setIsSignup(!isSignup)}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                {isSignup ? 'Log In' : 'Sign Up'}
                            </Button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;