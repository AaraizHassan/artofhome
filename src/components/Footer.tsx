import Link from 'next/link';
import React from 'react';
// import { FaFingerprint } from 'react-icons/fa';

import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';
import Image from 'next/image';
import logoimage from '../../public/images/art of home.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-blush-rose text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    {/* <Link href="/" className="flex items-center gap-2">
                        <FaFingerprint className="min-w-fit w-5 h-5 md:w-7 md:h-7" />
                        <h3 className="manrope text-xl font-semibold cursor-pointer">
                            {siteDetails.siteName}
                        </h3>
                    </Link> */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={logoimage}
                            alt="Art of Home Logo"
                            width={150}
                            height={150}
                            className="rounded"
                        />
                        {/* <h3 className="manrope text-xl font-semibold cursor-pointer text-[#E5E7EB]">
                            {siteDetails.siteName}
                        </h3> */}
                    </Link>
                    <h2 className="mt-3.5 text-burgundy">
                        {footerDetails.subheading}
                    </h2>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-burgundy">Quick Links</h4>
                    <ul className="text-burgundy">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-burgundy">Contact Us</h4>

                    {/* {footerDetails.email && <a href={`mailto:${footerDetails.email}`}  className="block text-burgundy hover:text-foreground">Email: {footerDetails.email}</a>} */}

                    {footerDetails.telephone && <a href={`tel:${footerDetails.telephone}`} className="block text-burgundy hover:text-foreground">Phone: {footerDetails.telephone}</a>}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerDetails.socials).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName]}
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 md:text-center text-soft-clay px-6">
                <p>Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}. All rights reserved.</p>
                <p className="text-sm mt-2 text-soft-clay">Made with &hearts; by <a href="https://qadars.net" target="_blank">Qadars Technology</a></p>
                {/* <p className="text-sm mt-2 text-gray-500">UI kit by <a href="https://ui8.net/youthmind/products/fintech-finance-mobile-app-ui-kit" target="_blank">Youthmind</a></p> */}
            </div>
        </footer>
    );
};

export default Footer;
