// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { pricingImages } from "@/data/pricing";
// import PaintingModal from "./PaintingModal";

// const Pricing = () => {
//     // const [activePainting, setActivePainting] = useState(null);
//     const [activePainting, setActivePainting] = useState<Painting | null>(null);

//     return (
//         <>
//             <div className="
//                 grid 
//                 grid-cols-1
//                 md:grid-cols-1
//                 lg:grid-cols-3
//                 gap-8
//             ">
//                 {pricingImages.map((item, index) => (
//                     <div key={index} className="w-full cursor-pointer"
//                         onClick={() => setActivePainting(item)}
//                     >
//                         <Image
//                             src={item.image}
//                             alt={item.title}
//                             width={800}
//                             height={800}
//                             className="w-full h-auto rounded-xl shadow-md object-cover"
//                         />

//                         <div className="mt-3 text-center">
//                             <p className="font-semibold text-lg">{item.title}</p>
//                             <p className="text-gray-600">
//                                 Starting from Rs. {item.prices[0]}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {activePainting && (
//                 <PaintingModal
//                     painting={activePainting}
//                     onClose={() => setActivePainting(null)}
//                 />
//             )}
//         </>
//     );
// };

// export default Pricing;


// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import PaintingModal from "./PaintingModal";
// import { pricingImages } from "@/data/pricing";

// export default function Pricing() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = (src: string) => {
//     setSelectedImage(src);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImage(null);
//   };

//   return (
//     <section className="py-12 px-6">
//       <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pricingImages.map((item, index) => (
//           <div
//             key={index}
//             className="cursor-pointer"
//             onClick={() => openModal(item.image)}
//           >
//             <Image
//               src={item.image}
//               alt={item.title}
//               width={400}
//               height={400}
//               className="rounded-lg shadow"
//             />
//             <p className="mt-2 font-semibold">{item.title}</p>
//           </div>
//         ))}
//       </div>

//       <PaintingModal
//         image={selectedImage || ""}
//         isOpen={isModalOpen}
//         onClose={closeModal}
//       />
//     </section>
//   );
// }


// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import PaintingModal from "./PaintingModal";
// import { pricingImages } from "@/data/pricing";

// export default function Pricing() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = (image: string) => {
//     setSelectedImage(image);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <section className="py-12 px-6">
//       <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pricingImages.map((item) => (
//           <div
//             key={item.id}
//             className="cursor-pointer"
//             onClick={() => openModal(item.image)}
//           >
//             <Image
//               src={item.image}
//               alt={item.title}
//               width={400}
//               height={400}
//               className="rounded-lg shadow"
//             />
//             <p className="mt-2 font-semibold text-center">{item.title}</p>
//           </div>
//         ))}
//       </div>

//       <PaintingModal
//         image={selectedImage || ""}
//         isOpen={isModalOpen}
//         onClose={closeModal}
//       />
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import Image from "next/image";
import PaintingModal from "./PaintingModal";
import { pricingImages } from "@/data/pricing";

export default function Pricing() {
  const [selectedPainting, setSelectedPainting] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (painting: any) => {
    setSelectedPainting(painting);
    setIsModalOpen(true);
  };

  return (
    <section className="py-12 px-6">
      {/* <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingImages.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => openModal(item)}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={400}
              className="rounded-xl shadow"
            />

            {/* BELOW IMAGE */}
            <p className="mt-2 font-bold">{item.title}</p>
            <p className="text-gray-600 text-sm">
              Starting at PKR {item.prices[0]}
            </p>
            <p className="text-gray-600 text-sm">
              Sizes: {item.dimensions.join(", ")}
            </p>
          </div>
        ))}
      </div>

      <PaintingModal
        painting={selectedPainting}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
