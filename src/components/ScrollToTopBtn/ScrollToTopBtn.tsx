'use client';

import React, { useState, useEffect } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';

import './scrollToTopBtn.scss';

interface ScrollToTopBtnProps { }

const ScrollToTopBtn: React.FC<ScrollToTopBtnProps> = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && <TfiArrowCircleUp onClick={scrollToTop} id="scrollToTopBtn" />}
        </>
    );
};

export default ScrollToTopBtn;