'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaBarsStaggered } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

import './CHeaderLinksAndButtons.scss';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks';
import UserNavLinks from '@/components/UserNavLinks/UserNavLinks';

interface CHeaderLinksAndButtonsProps {
    t: any
}

const CHeaderLinksAndButtons: React.FC<CHeaderLinksAndButtonsProps> = ({ t }) => {
    const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);
    const [userSession, setUserSession] = useState<boolean>(false);
    const [isShownUserLinks, setIsShownUserLinks] = useState<boolean>(false);

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
                                    <UserNavLinks t={t} />
                                    <li>
                                        {userSession && <button onClick={() => setUserSession(state => !state)}>{t.logout}</button>}
                                    </li>
                                </ul>
                            </aside>
                        )}
                    </section>
                )}

                <ul>
                    <NavigationLinks t={t} />
                </ul>

                {!userSession && <button onClick={() => setUserSession(state => !state)} className="glow-on-hover">{t.login}</button>}
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
                            <UserNavLinks t={t} />
                        )}

                        <NavigationLinks t={t} />
                    </ul>

                    {!userSession && <button onClick={() => setUserSession(state => !state)} className="glow-on-hover">{t.login}</button>}

                    {userSession && <button onClick={() => setUserSession(state => !state)} className="glow-on-hover">{t.logout}</button>}
                </nav>
            )}
        </div>
    );
};

export default CHeaderLinksAndButtons;