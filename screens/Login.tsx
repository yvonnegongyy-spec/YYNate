import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface LoginProps {
    onGuestLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onGuestLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background-dark px-6 py-12">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                        <span className="material-symbols-outlined text-4xl">style</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white">
                        {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Or{' '}
                        <button
                            onClick={() => {
                                setMode(mode === 'signin' ? 'signup' : 'signin');
                                setError(null);
                            }}
                            className="font-medium text-primary hover:text-primary-alt transition-colors"
                        >
                            {mode === 'signin' ? 'start your 14-day free trial' : 'sign in to existing account'}
                        </button>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-t-md border border-slate-700 bg-surface-dark px-3 py-3 text-white placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-b-md border border-slate-700 bg-surface-dark px-3 py-3 text-white placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-500/10 p-4 border border-red-500/20">
                            <div className="flex">
                                <div className="flex-shrink-0 text-red-400">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-400">Authentication Error</h3>
                                    <div className="mt-2 text-sm text-red-300/80">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                        >
                            {loading && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            )}
                            {mode === 'signin' ? 'Sign in' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-background-dark px-2 text-slate-400">Or continue without account</span>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={onGuestLogin}
                        className="w-full flex justify-center py-3 px-4 rounded-xl border border-slate-600 bg-transparent text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
