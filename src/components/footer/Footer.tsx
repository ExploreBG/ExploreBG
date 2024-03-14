import React from 'react';
import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa6';

import './footer.scss';
import CLogo from '../common/CLogo/CLogo';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <section>
                <CLogo />

                <aside>
                    <ul>
                        <li><Link href="">Contact us</Link></li>
                        <li><Link href="">Terms and conditions</Link></li>
                    </ul>
                </aside>
            </section>
            <section>
                <span><FaRegCopyright /> {new Date().getFullYear()} Explore BG</span>
            </section>
        </footer>
    );
};

export default Footer;