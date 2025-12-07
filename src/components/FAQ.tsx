// "use client"
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { BiMinus, BiPlus } from "react-icons/bi";

// import SectionTitle from "./SectionTitle";
// import { faqs } from "@/data/faq";

// const FAQ: React.FC = () => {
//     return (
//         <section id="faq" className="py-10 lg:py-20">
//             <div className="flex flex-col lg:flex-row gap-10">
//                 <div className="">
//                     <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
//                     <SectionTitle>
//                         <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">Frequently Asked Questions</h2>
//                     </SectionTitle>
//                     <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
//                         Ask us anything!
//                     </p>
//                     <a href="mailto:" className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left">help@finwise.com</a>
//                 </div>

//                 <div className="w-full lg:max-w-2xl mx-auto border-b">
//                     {faqs.map((faq, index) => (
//                         <div key={index} className="mb-7">
//                             <Disclosure>
//                                 {({ open }) => (
//                                     <>
//                                         <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
//                                             <span className="text-2xl font-semibold">{faq.question}</span>
//                                             {open ? <BiMinus className="w-5 h-5 text-secondary" /> : <BiPlus className="w-5 h-5 text-secondary" />}
//                                         </DisclosureButton>
//                                         <DisclosurePanel className="px-4 pt-4 pb-2 text-foreground-accent">
//                                             {faq.answer}
//                                         </DisclosurePanel>
//                                     </>
//                                 )}
//                             </Disclosure>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FAQ;

"use client";

import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { awards } from "@/data/faq";

const Awards: React.FC = () => {
    return (
        <section id="awards" className="py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-10">
                
                {/* LEFT SECTION */}
                <div>
                    <p className="hidden lg:block text-foreground-accent">AWARDS</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">
                            Certifications & Achievements
                        </h2>
                    </SectionTitle>
                    <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
                        A glimpse of our excellence.
                    </p>
                </div>

                {/* RIGHT SECTION — AWARDS GRID */}
                <div className="w-full lg:max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {awards.map((award, index) => (
                        <div key={index} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="w-full h-52 relative mb-4">
                                <Image
                                    src={award.image}
                                    alt={award.title}
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">{award.title}</h3>
                            <p className="text-foreground-accent mt-2 text-sm">
                                {award.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
