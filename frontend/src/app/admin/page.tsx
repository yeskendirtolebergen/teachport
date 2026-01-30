'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await apiFetch('/admin/teachers');
                setTeachers(data);
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, [router]);

    if (loading) return <div className={styles.loading}>Loading administration...</div>;

    return (
        <div className={styles.layout}>
            <Sidebar role="ADMIN" />
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Admin Control Center</h1>
                    <p className={styles.subtitle}>Manage teacher portfolios and moderate achievements.</p>
                </header>

                <section className={`${styles.card} glass`}>
                    <div className={styles.cardHeader}>
                        <h3>Teacher Registry</h3>
                        <span className={styles.count}>{teachers.length} total teachers</span>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>IIN</th>
                                <th>Subject</th>
                                <th>Workplace</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((t) => (
                                <tr key={t.id}>
                                    <td className={styles.nameCell}>{t.firstName} {t.lastName}</td>
                                    <td>{t.user?.iin}</td>
                                    <td>{t.subject}</td>
                                    <td>{t.currentWorkplace}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => router.push(`/admin/teachers/${t.id}`)}
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                        >
                                            View Portfolio
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {teachers.length === 0 && (
                                <tr><td colSpan={5}>No teachers registered yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
