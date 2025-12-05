// "use client";

// import Image from "next/image";
// import { X } from "lucide-react";
// import { useState } from "react";

// interface Painting {
//   id: string;
//   title: string;
//   image: string;
//   description: string;
//   dimensions: string[];
//   prices: number[];
// }

// interface PaintingModalProps {
//   painting: Painting | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function PaintingModal({ painting, isOpen, onClose }: PaintingModalProps) {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [sending, setSending] = useState(false);
//   const [success, setSuccess] = useState(false);

//   if (!isOpen || !painting) return null;

//   const price = painting.prices[selectedIndex] || 0;
//   const advance = price / 2;

//   const submitForm = async () => {
//     if (!name || !phone) {
//       alert("Name and phone are required.");
//       return;
//     }

//     setSending(true);

//     try {
//       const res = await fetch("/api/send-form", {
//         method: "POST",
//         body: JSON.stringify({
//           name,
//           email,
//           phone,
//           paintingId: painting.id,
//           dimension: painting.dimensions[selectedIndex],
//           price,
//         }),
//       });

//       if (res.ok) setSuccess(true);
//       else alert("Failed to submit order. Try again.");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting form.");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 overflow-auto">
//       <div className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
//         {/* CROSS BUTTON */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
//         >
//           <X size={24} />
//         </button>

//         {/* IMAGE */}
//         <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-gray-50">
//           <Image
//             src={painting.image}
//             alt={painting.title}
//             width={600}
//             height={600}
//             className="object-contain w-full max-h-[60vh] md:max-h-[80vh] rounded-lg"
//           />
//         </div>

//         {/* DETAILS */}
//         <div className="w-full md:w-1/2 p-6 overflow-auto">
//           <h2 className="text-2xl font-bold">{painting.title}</h2>
//           <p className="text-gray-700 mt-2">{painting.description}</p>

//           {/* Dimensions */}
//           <div className="mt-4">
//             <p className="font-semibold mb-2">Select Dimension:</p>
//             <div className="flex gap-3 flex-wrap">
//               {painting.dimensions.map((d, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedIndex(i)}
//                   className={`px-4 py-2 rounded-lg border ${
//                     selectedIndex === i ? "bg-black text-white" : "bg-gray-100"
//                   }`}
//                 >
//                   {d} — PKR {painting.prices[i]}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price & Advance */}
//           <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//             <p><strong>Total Price:</strong> PKR {price}</p>
//             <p><strong>50% Advance:</strong> PKR {advance}</p>
//           </div>

//           {/* Bank Details */}
//           <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//             <p className="font-semibold">Bank Transfer Details:</p>
//             <p>Bank: Meezan Bank</p>
//             <p>Account Title: Art of Home</p>
//             <p>Account Number: 0123456789</p>
//           </div>

//           {/* Form */}
//           <div className="mt-5">
//             <h3 className="text-lg font-semibold mb-3">Order Form</h3>
//             <input
//               className="w-full border p-2 rounded mb-2"
//               placeholder="Full Name (required)"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               className="w-full border p-2 rounded mb-2"
//               placeholder="Email (optional)"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               className="w-full border p-2 rounded mb-4"
//               placeholder="Phone Number (required)"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <button
//               onClick={submitForm}
//               disabled={sending}
//               className="w-full bg-black text-white py-3 rounded-lg"
//             >
//               {sending ? "Sending..." : "Submit Order"}
//             </button>
//             {success && <p className="mt-3 text-green-600">Order submitted successfully!</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface Painting {
  id: string;
  title: string;
  image: string;
  description: string;
  dimensions: string[];
  prices: number[];
}

interface PaintingModalProps {
  painting: Painting | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaintingModal({ painting, isOpen, onClose }: PaintingModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !painting) return null;

  const price = painting.prices[selectedIndex] || 0;
  const advance = price / 2;

  const submitForm = async () => {
    if (!name || !phone) {
      alert("Name and phone are required.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/send-form", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          paintingId: painting.id,
          dimension: painting.dimensions[selectedIndex],
          price,
        }),
      });

      if (res.ok) setSuccess(true);
      else alert("Failed to submit order. Try again.");
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    } finally {
      setSending(false);
    }
  };

  // --------------------------
  // Mobile Layout
  // --------------------------
//   if (isMobile) {
//     return (
//       <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 overflow-auto">
//         <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg flex flex-col overflow-auto">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
//           >
//             <X size={24} />
//           </button>

//           <div className="p-4">
//             <Image
//               src={painting.image}
//               alt={painting.title}
//               width={600}
//               height={600}
//               className="w-full h-auto object-contain rounded-lg"
//             />

//             <h2 className="text-2xl font-bold mt-4">{painting.title}</h2>
//             <p className="text-gray-700 mt-2">{painting.description}</p>

//             {/* Dimensions */}
//             <div className="mt-4">
//               <p className="font-semibold mb-2">Select Dimension:</p>
//               <div className="flex gap-3 flex-wrap">
//                 {painting.dimensions.map((d, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedIndex(i)}
//                     className={`px-4 py-2 rounded-lg border ${
//                       selectedIndex === i ? "bg-black text-white" : "bg-gray-100"
//                     }`}
//                   >
//                     {d} — PKR {painting.prices[i]}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Price & Bank */}
//             <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//               <p><strong>Total Price:</strong> PKR {price}</p>
//               <p><strong>50% Advance:</strong> PKR {advance}</p>
//             </div>

//             <div className="mt-4 p-3 bg-gray-100 rounded-lg">
//               <p className="font-semibold">Bank Transfer Details:</p>
//               <p>Bank: Meezan Bank</p>
//               <p>Account Title: Art of Home</p>
//               <p>Account Number: 0123456789</p>
//             </div>

//             {/* Form */}
//             <div className="mt-5">
//               <h3 className="text-lg font-semibold mb-3">Order Form</h3>
//               <input
//                 className="w-full border p-2 rounded mb-2"
//                 placeholder="Full Name (required)"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 className="w-full border p-2 rounded mb-2"
//                 placeholder="Email (optional)"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 className="w-full border p-2 rounded mb-4"
//                 placeholder="Phone Number (required)"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//               <button
//                 onClick={submitForm}
//                 disabled={sending}
//                 className="w-full bg-black text-white py-3 rounded-lg"
//               >
//                 {sending ? "Sending..." : "Submit Order"}
//               </button>
//               {success && <p className="mt-3 text-green-600">Order submitted successfully!</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

// MOBILE ONLY FIX INSIDE THE SAME COMPONENT
    if (isMobile) {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-2">
        {/* Scrollable modal container */}
        <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto p-4">

            {/* Cross button */}
            <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            >
            <X size={24} />
            </button>

            {/* IMAGE */}
            <div className="w-full flex justify-center items-center">
            <Image
                src={painting.image}
                alt={painting.title}
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
            />
            </div>

            {/* DETAILS */}
            <div className="mt-4">
            <h2 className="text-2xl font-bold">{painting.title}</h2>
            <p className="text-gray-700 mt-2">{painting.description}</p>

            {/* Dimensions */}
            <div className="mt-4">
                <p className="font-semibold mb-2">Select Dimension:</p>
                <div className="flex gap-3 flex-wrap">
                {painting.dimensions.map((d, i) => (
                    <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`px-4 py-2 rounded-lg border ${
                        selectedIndex === i ? "bg-black text-white" : "bg-gray-100"
                    }`}
                    >
                    {d} — PKR {painting.prices[i]}
                    </button>
                ))}
                </div>
            </div>

            {/* Price & Bank */}
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p><strong>Total Price:</strong> PKR {painting.prices[selectedIndex]}</p>
                <p><strong>50% Advance:</strong> PKR {painting.prices[selectedIndex] / 2}</p>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="font-semibold">Bank Transfer Details:</p>
                <p>Bank: Meezan Bank</p>
                <p>Account Title: Art of Home</p>
                <p>Account Number: 0123456789</p>
            </div>

            {/* Form */}
            <div className="mt-5">
                <h3 className="text-lg font-semibold mb-3">Order Form</h3>
                <input
                className="w-full border p-2 rounded mb-2"
                placeholder="Full Name (required)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                className="w-full border p-2 rounded mb-2"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                className="w-full border p-2 rounded mb-4"
                placeholder="Phone Number (required)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />
                <button
                onClick={submitForm}
                disabled={sending}
                className="w-full bg-black text-white py-3 rounded-lg"
                >
                {sending ? "Sending..." : "Submit Order"}
                </button>
                {success && <p className="mt-3 text-green-600">Order submitted successfully!</p>}
            </div>
            </div>
        </div>
        </div>
    );
    }


  // --------------------------
  // Desktop Layout
  // --------------------------
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 overflow-auto">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-5xl flex flex-row overflow-hidden max-h-[90vh]">
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="w-1/2 flex justify-center items-center p-4 bg-gray-50">
          <Image
            src={painting.image}
            alt={painting.title}
            width={600}
            height={600}
            className="object-contain w-full h-auto rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="w-1/2 p-6 overflow-auto">
          <h2 className="text-2xl font-bold">{painting.title}</h2>
          <p className="text-gray-700 mt-2">{painting.description}</p>

          {/* Dimensions */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Select Dimension:</p>
            <div className="flex gap-3 flex-wrap">
              {painting.dimensions.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedIndex === i ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {d} — PKR {painting.prices[i]}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Bank */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p><strong>Total Price:</strong> PKR {price}</p>
            <p><strong>50% Advance:</strong> PKR {advance}</p>
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold">Bank Transfer Details:</p>
            <p>Bank: Meezan Bank</p>
            <p>Account Title: Art of Home</p>
            <p>Account Number: 0123456789</p>
          </div>

          {/* Form */}
          <div className="mt-5">
            <h3 className="text-lg font-semibold mb-3">Order Form</h3>
            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Full Name (required)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded mb-4"
              placeholder="Phone Number (required)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={submitForm}
              disabled={sending}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {sending ? "Sending..." : "Submit Order"}
            </button>
            {success && <p className="mt-3 text-green-600">Order submitted successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
