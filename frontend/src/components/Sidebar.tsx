'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './sidebar.module.css';

export default function Sidebar({ role }: { role: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <aside className={`${styles.sidebar} glass`}>
            <div className={styles.top}>
                <h2 className={styles.logo}>TeachPort</h2>
                <nav className={styles.nav}>
                    {role === 'TEACHER' ? (
                        <>
                            <Link href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
                                My Portfolio
                            </Link>
                            <Link href="/dashboard/edit" className={pathname === '/dashboard/edit' ? styles.active : ''}>
                                Edit Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/admin" className={pathname === '/admin' ? styles.active : ''}>
                                Dashboard
                            </Link>
                            <Link href="/admin/teachers" className={pathname === '/admin/teachers' ? styles.active : ''}>
                                Teacher List
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            <button onClick={handleLogout} className={styles.logoutBtn}>
                Log Out
            </button>
        </aside>
    );
}
