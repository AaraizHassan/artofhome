import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
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
        },
        {
            text: "Clients",
            url: "#clients"
        },
        {
            text: "FAQ",
            url: "#faq"
        }
    ],
    telephone: '+92 337 8639893',
    socials: {
        facebook: 'https://www.facebook.com/share/1BnNdaNTTq/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/artofhome.pk?igsh=MWZrcm9sbDRlZTUyNA==',
    }
};
