'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
    const [iin, setIin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ iin, password }),
            });

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (data.user.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={`${styles.loginCard} glass`}>
                <h1 className={styles.title}>TeachPort</h1>
                <p className={styles.subtitle}>Academic Portfolio Platform</p>

                <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="iin-input">IIN (National ID)</label>
                        <input
                            id="iin-input"
                            type="text"
                            className={styles.input}
                            placeholder="Enter your 12-digit IIN"
                            value={iin}
                            onChange={(e) => setIin(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password-input">Password</label>
                        <input
                            id="password-input"
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary submitBtn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>

                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
