'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import Image from 'next/image';

import Container from './Container';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Detect scroll to change navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-300
                ${scrolled ? "bg-warm-cream/90 backdrop-blur-md shadow-sm border-b border-[#E7E0D5]" : "bg-warm-cream border-b border-transparent"}
            `}
        >
            <Container className="!px-0">
                <nav className="mx-auto flex justify-between items-center py-2.5 px-6 transition-all duration-300">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/images/art of home.png"
                            alt="Art of Home Logo"
                            width={54}
                            height={54}
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                        <span className="font-serif text-2xl font-semibold tracking-tight text-burgundy cursor-pointer">
                            {siteDetails.siteName}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex items-center space-x-7">
                            {menuItems.map(item => (
                                <li key={item.text}>
                                    <Link
                                        href={item.url}
                                        className="font-sans text-xs uppercase tracking-widest text-stone-700 hover:text-burgundy font-medium transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-burgundy hover:after:w-full after:transition-all"
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="#gallery"
                            className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-white bg-burgundy hover:bg-[#521E27] px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
                        >
                            Explore Gallery
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-white/80 border border-[#E7E0D5] text-burgundy focus:outline-none rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-warm-cream/95 backdrop-blur-md border-b border-[#E7E0D5] shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-3 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link
                                    href={item.url}
                                    className="font-sans text-sm uppercase tracking-wider text-burgundy hover:text-gold-600 font-medium block py-1"
                                    onClick={toggleMenu}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-2">
                            <Link
                                href="#gallery"
                                className="inline-block text-xs uppercase tracking-wider font-semibold text-white bg-burgundy hover:bg-[#521E27] px-6 py-3 rounded-full text-center w-full shadow"
                                onClick={toggleMenu}
                            >
                                Explore Gallery
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
