'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import './CHeaderLinksAndButtons.scss';
import CLink from '../CLink/CLink';
import { navLinks, userLinks } from './links';

interface CHeaderLinksAndButtonsProps { }

const CHeaderLinksAndButtons: React.FC<CHeaderLinksAndButtonsProps> = () => {
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
                                    {userLinks.map((link) => (
                                        <li key={link.title}><CLink item={link} /></li>
                                    ))}
                                    <li>
                                        {userSession && <button onClick={() => setUserSession(state => !state)}>Logout</button>}
                                    </li>
                                </ul>
                            </aside>
                        )}
                    </section>
                )}

                <ul>
                    {navLinks.map((link) => <li key={link.title}><CLink item={link} /></li>)}
                </ul>

                {!userSession && <button onClick={() => setUserSession(state => !state)} className="glow-on-hover">Login/Sign up</button>}
            </nav>

            <button onClick={() => setIsOpenNavbar(state => !state)} className="nav-wrapper__navbar">Menu</button>

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
                            userLinks.map((link) => (
                                <li key={link.title}><CLink item={link} /></li>
                            ))
                        )}

                        {navLinks.map((link) => (
                            <li key={link.title}><CLink item={link} /></li>
                        ))}
                    </ul>

                    {!userSession && <button onClick={() => setUserSession(state => !state)} className="glow-on-hover">Login/Sign up</button>}

                    {userSession && <button onClick={() => setUserSession(state => !state)} className="glow-on-hover">Logout</button>}
                </nav>
            )}
        </div>
    );
};

export default CHeaderLinksAndButtons;