// import PricingColumn from "./PricingColumn";

// import { tiers } from "@/data/pricing";

// const Pricing: React.FC = () => {
//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {tiers.map((tier, index) => (
//                 <PricingColumn key={tier.name} tier={tier} highlight={index === 1} />
//             ))}
//         </div>
//     )
// }

// export default Pricing


import Image from "next/image";
import { pricingImages } from "@/data/pricing.ts";

const Pricing: React.FC = () => {
    return (
        <div
            className="
                grid 
                grid-cols-1          /* mobile: 1 column */
                md:grid-cols-1       /* tablet: still 1 column */
                lg:grid-cols-3       /* laptop/desktop: 3 columns */
                gap-8
            "
        >
            {pricingImages.map((img, index) => (
                <div key={index} className="w-full">
                    <Image
                        src={img}
                        alt={`Pricing option ${index + 1}`}
                        width={800}
                        height={800}
                        className="w-full h-auto rounded-xl shadow-md object-cover"
                    />
                </div>
            ))}
        </div>
    );
};

export default Pricing;
