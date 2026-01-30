'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiFetch('/teachers/me');
                setProfile(data);
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    if (loading) return <div className={styles.loading}>Loading portfolio...</div>;
    if (!profile) return null;

    return (
        <div className={styles.layout}>
            <Sidebar role="TEACHER" />
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>My Academic Portfolio</h1>
                    <p className={styles.subtitle}>{profile.firstName} {profile.lastName} • {profile.currentWorkplace}</p>
                </header>

                <div className={styles.grid}>
                    {/* Info Card */}
                    <section className={`${styles.card} glass`}>
                        <h3>Personal Information</h3>
                        <div className={styles.infoList}>
                            <div className={styles.infoItem}><span>Email:</span> {profile.email}</div>
                            <div className={styles.infoItem}><span>Subject:</span> {profile.subject}</div>
                            <div className={styles.infoItem}><span>Category:</span> {profile.category}</div>
                            <div className={styles.infoItem}><span>IIN:</span> {profile.user?.iin}</div>
                        </div>
                    </section>

                    {/* TAT Results */}
                    <section className={`${styles.card} glass`}>
                        <h3>TAT Results</h3>
                        <div className={styles.resultsGrid}>
                            <div className={styles.resultItem}>
                                <label>2024</label>
                                <div className={styles.value}>{profile.certifications.find((c: any) => c.type === 'TAT' && c.year === 2024)?.value || 'N/A'}%</div>
                            </div>
                            <div className={styles.resultItem}>
                                <label>2025</label>
                                <div className={styles.value}>{profile.certifications.find((c: any) => c.type === 'TAT' && c.year === 2025)?.value || 'N/A'}%</div>
                            </div>
                            <div className={styles.resultItem}>
                                <label>2026</label>
                                <div className={styles.value}>{profile.certifications.find((c: any) => c.type === 'TAT' && c.year === 2026)?.value || 'N/A'}%</div>
                            </div>
                        </div>
                    </section>

                    {/* Student Results */}
                    <section className={`${styles.card} ${styles.fullWidth} glass`}>
                        <h3>Student Performance Data</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Value</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profile.studentResults.map((res: any) => (
                                    <tr key={res.id}>
                                        <td>{res.type}</td>
                                        <td>{res.value}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[res.status.toLowerCase()]}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {profile.studentResults.length === 0 && (
                                    <tr><td colSpan={3}>No results uploaded.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>
        </div>
    );
}
