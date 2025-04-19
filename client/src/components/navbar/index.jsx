"use client";
import Navbar from './Navbar';
import React, { useEffect } from 'react';

const Navbarin = () => {
    useEffect(() => {
        // The debounce function receives our function as a parameter
        const debounce = (fn) => {
            let frame;
            return (...params) => {
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                frame = requestAnimationFrame(() => {
                    fn(...params);
                });
            };
        };

        // Reads out the scroll position and stores it in the data attribute
        const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY.toString();
        };

        // Listen for new scroll events, debounce `storeScroll`
        document.addEventListener('scroll', debounce(storeScroll), { passive: true });

        // Update scroll position initially
        storeScroll();
    }, []);

    return <Navbar />;
};

export default Navbarin;
