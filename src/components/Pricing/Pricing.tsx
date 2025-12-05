// import Image from "next/image";
// import { pricingImages } from "@/data/pricing";

// const Pricing: React.FC = () => {
//     return (
//         <div
//             className="
//                 grid 
//                 grid-cols-1          /* mobile: 1 column */
//                 md:grid-cols-1       /* tablet: still 1 column */
//                 lg:grid-cols-3       /* laptop/desktop: 3 columns */
//                 gap-8
//             "
//         >
//             {pricingImages.map((img, index) => (
//                 <div key={index} className="w-full">
//                     <Image
//                         src={img}
//                         alt={`Pricing option ${index + 1}`}
//                         width={800}
//                         height={800}
//                         className="w-full h-auto rounded-xl shadow-md object-cover"
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Pricing;

"use client";
import Image from "next/image";
import { useState } from "react";
import { pricingImages } from "@/data/pricing";
import PaintingModal from "./PaintingModal";

const Pricing = () => {
    const [activePainting, setActivePainting] = useState(null);

    return (
        <>
            <div className="
                grid 
                grid-cols-1
                md:grid-cols-1
                lg:grid-cols-3
                gap-8
            ">
                {pricingImages.map((item, index) => (
                    <div key={index} className="w-full cursor-pointer"
                        onClick={() => setActivePainting(item)}
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={800}
                            height={800}
                            className="w-full h-auto rounded-xl shadow-md object-cover"
                        />

                        <div className="mt-3 text-center">
                            <p className="font-semibold text-lg">{item.title}</p>
                            <p className="text-gray-600">
                                Starting from Rs. {item.prices[0]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {activePainting && (
                <PaintingModal
                    painting={activePainting}
                    onClose={() => setActivePainting(null)}
                />
            )}
        </>
    );
};

export default Pricing;
