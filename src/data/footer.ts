import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Art of Home",
    quickLinks: [
        {
            text: "Gallery",
            url: "#gallery"
        },
        {
            text: "About",
            url: "#about"
        },
        {
            text: "Awards",
            url: "#awards"
        }
    ],
    // email: 'address@yoursite.com',
    telephone: '+92 337 8639893',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        // twitter: 'https://twitter.com/Twitter',
        facebook: 'https://www.facebook.com/share/1BnNdaNTTq/?mibextid=wwXIfr',
        // youtube: 'https://youtube.com',
        // linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com/artofhome.pk?igsh=MWZrcm9sbDRlZTUyNA==',
    }
}