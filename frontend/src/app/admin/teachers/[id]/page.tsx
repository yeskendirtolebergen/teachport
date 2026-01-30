'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import styles from './detail.module.css';

export default function TeacherDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [teacher, setTeacher] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const data = await apiFetch(`/admin/teachers/${id}`);
                setTeacher(data);
            } catch (err) {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id, router]);

    const updateStatus = async (type: string, itemId: number, status: string) => {
        try {
            let endpoint = '';
            if (type === 'cert') endpoint = `/admin/certifications/${itemId}/status`;
            if (type === 'result') endpoint = `/admin/student-results/${itemId}/status`;

            await apiFetch(endpoint, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });

            // Refresh data
            const updated = await apiFetch(`/admin/teachers/${id}`);
            setTeacher(updated);
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className={styles.loading}>Loading detail...</div>;
    if (!teacher) return null;

    return (
        <div className={styles.layout}>
            <Sidebar role="ADMIN" />
            <main className={styles.main}>
                <header className={styles.header}>
                    <button className={styles.backLink} onClick={() => router.back()}>← Back to List</button>
                    <h1>Portfolio Review</h1>
                    <p className={styles.subtitle}>{teacher.firstName} {teacher.lastName} (IIN: {teacher.user?.iin})</p>
                </header>

                <div className={styles.grid}>
                    {/* Achievements for Moderation */}
                    <section className={`${styles.card} ${styles.fullWidth} glass`}>
                        <h3>Moderation: Certifications</h3>
                        <div className={styles.itemList}>
                            {teacher.certifications.map((cert: any) => (
                                <div key={cert.id} className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <strong>{cert.type} ({cert.year || 'No Year'})</strong>
                                        <span>Result: {cert.value}</span>
                                    </div>
                                    <div className={styles.actions}>
                                        <span className={`${styles.badge} ${styles[cert.status.toLowerCase()]}`}>{cert.status}</span>
                                        <button className={styles.approve} onClick={() => updateStatus('cert', cert.id, 'APPROVED')}>Approve</button>
                                        <button className={styles.reject} onClick={() => updateStatus('cert', cert.id, 'REJECTED')}>Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Student Results for Moderation */}
                    <section className={`${styles.card} ${styles.fullWidth} glass`}>
                        <h3>Moderation: Student Results</h3>
                        <div className={styles.itemList}>
                            {teacher.studentResults.map((res: any) => (
                                <div key={res.id} className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <strong>{res.type}</strong>
                                        <span>Value: {res.value}</span>
                                    </div>
                                    <div className={styles.actions}>
                                        <span className={`${styles.badge} ${styles[res.status.toLowerCase()]}`}>{res.status}</span>
                                        <button className={styles.approve} onClick={() => updateStatus('result', res.id, 'APPROVED')}>Approve</button>
                                        <button className={styles.reject} onClick={() => updateStatus('result', res.id, 'REJECTED')}>Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
