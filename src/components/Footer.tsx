import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';
import logoimage from '../../public/images/art of home.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#3D141C] text-stone-200 pt-16 pb-12 border-t border-[#4E1A24]">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                            <Image
                                src={logoimage}
                                alt="Art of Home Logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                        <span className="font-serif text-2xl font-semibold text-white tracking-tight">
                            {siteDetails.siteName}
                        </span>
                    </Link>
                    <p className="mt-4 font-serif text-gold-200/90 text-sm leading-relaxed">
                        {footerDetails.subheading}
                    </p>
                </div>

                <div>
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-gold-400">
                        Quick Links
                    </h4>
                    <ul className="space-y-2.5 text-sm text-stone-300">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text}>
                                <Link 
                                    href={link.url} 
                                    className="hover:text-gold-300 transition-colors inline-block"
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-gold-400">
                        Contact Us
                    </h4>

                    {footerDetails.telephone && (
                        <a 
                            href={`tel:${footerDetails.telephone}`} 
                            className="text-sm text-stone-300 hover:text-white transition-colors block"
                        >
                            Phone: <span className="font-medium text-white">{footerDetails.telephone}</span>
                        </a>
                    )}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-4 flex-wrap text-gold-400">
                            {Object.keys(footerDetails.socials).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName]}
                                            key={platformName}
                                            aria-label={platformName}
                                            className="p-2.5 rounded-full bg-white/5 hover:bg-gold-500 hover:text-[#3D141C] border border-white/10 transition-all duration-300"
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 text-center text-stone-400 text-xs px-6">
                <p>Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.</p>
                <p className="mt-2 text-stone-400">
                    Made with &hearts; by{" "}
                    <a 
                        href="https://qadars.net" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gold-300 hover:underline"
                    >
                        Qadars Technology
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
