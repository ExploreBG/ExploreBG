'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/navigation';
import { JWTPayload } from 'jose';
import { FaBarsStaggered } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';

import { getSession, clearSession } from '@/utils/userSession';

import './CHeaderLinksAndButtons.scss';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks';
import UserNavLinks from '@/components/UserNavLinks/UserNavLinks';

interface CHeaderLinksAndButtonsProps { }

const CHeaderLinksAndButtons: React.FC<CHeaderLinksAndButtonsProps> = () => {
    const t = useTranslations('navigation');
    const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);
    const [userSession, setUserSession] = useState<JWTPayload | null>(null);
    const [userId, setUserId] = useState<string>('');
    const [isShownUserLinks, setIsShownUserLinks] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        async function session() {
            const data = await getSession();

            if (data) {
                setUserSession(data);
                // @ts-ignore
                setUserId(data.userData.userId);
            }
        }
        session();
    }, []);

    const onLogoutClick = async () => {
        await clearSession();

        toast.success(t('successful-logout'));
        router.push('/');
    };

    return (
        <div className="nav-wrapper">
            <nav className="nav-wrapper__links" aria-label="primary-navigation">
                {userSession && (
                    <section className="nav-wrapper__links__user">
                        <figure onClick={() => setIsShownUserLinks(state => !state)}>
                            <Image
                                src={'/images/user-profile-pic.png'}
                                width={50} height={50} loading="eager"
                                alt="User profile picture" title="User profile picture"
                                priority={true}
                            />
                        </figure>

                        {isShownUserLinks && (
                            <aside className="nav-wrapper__links__user__links">
                                <ul>
                                    <UserNavLinks id={userId} />
                                    <li>
                                        {userSession && <button onClick={onLogoutClick}>{t('logout')}</button>}
                                    </li>
                                </ul>
                            </aside>
                        )}
                    </section>
                )}

                <ul>
                    <NavigationLinks />
                </ul>

                {!userSession && <Link href={'/login-register'} className="glow-on-hover">{t('login')}</Link>}
            </nav>

            <div onClick={() => setIsOpenNavbar(state => !state)} className="nav-wrapper__navbar">
                {!isOpenNavbar && <FaBarsStaggered />}

                {isOpenNavbar && <MdClose className="nav-wrapper__navbar__close" />}
            </div>

            {isOpenNavbar && (
                <nav className="nav-wrapper__mobile-links" aria-label="small-screen-navigation">
                    {userSession && (
                        <figure>
                            <Image
                                src={'/images/user-profile-pic.png'}
                                width={50} height={50} loading="eager"
                                alt="User profile picture" title="User profile picture"
                                priority={true}
                            />
                        </figure>
                    )}

                    <ul>
                        {userSession && (
                            <UserNavLinks id={userId} />
                        )}

                        <NavigationLinks />
                    </ul>

                    {!userSession && <Link href={'/login-register'} className="glow-on-hover">{t('login')}</Link>}

                    {userSession && <button onClick={onLogoutClick} className="glow-on-hover">{t('logout')}</button>}
                </nav>
            )}
        </div>
    );
};

export default CHeaderLinksAndButtons;