import { useState } from "react";
import Image from "next/image";

const PaintingModal = ({ painting, onClose }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);

    const price = painting.prices[selectedIndex];
    const advance = price * 0.5;

    const submitForm = async () => {
        if (!form.name || !form.phone) {
            alert("Name and phone number are required.");
            return;
        }

        setLoading(true);

        await fetch("/api/send-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paintingId: painting.id,
                dimension: painting.dimensions[selectedIndex],
                price,
                advance,
                ...form
            })
        });

        setLoading(false);
        onClose();
        alert("Your request has been submitted!");
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-xl"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-4">{painting.title}</h2>

                <Image
                    src={painting.image}
                    alt={painting.title}
                    width={600}
                    height={600}
                    className="rounded-xl mx-auto"
                />

                <p className="mt-4 text-gray-700">{painting.description}</p>

                {/* Dimensions */}
                <div className="mt-5">
                    <p className="font-semibold mb-2">Select Dimension</p>
                    <div className="flex gap-3 flex-wrap">
                        {painting.dimensions.map((dim, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedIndex(idx)}
                                className={`px-3 py-2 rounded-lg border ${
                                    idx === selectedIndex
                                        ? "bg-black text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                {dim}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price & Advance */}
                <div className="mt-4">
                    <p><strong>Price:</strong> Rs. {price}</p>
                    <p><strong>50% Advance:</strong> Rs. {advance}</p>
                </div>

                {/* Bank Details */}
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold">Bank Transfer Details</p>
                    <p>Account Title: Your Name</p>
                    <p>Account Number: 123456789</p>
                    <p>Bank: Meezan Bank</p>
                </div>

                {/* Form */}
                <div className="mt-4">
                    <p className="font-semibold mb-2">Submit Your Details</p>

                    <input
                        type="text"
                        placeholder="Name (required)"
                        className="w-full p-2 border rounded mb-2"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email (optional)"
                        className="w-full p-2 border rounded mb-2"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Phone (required)"
                        className="w-full p-2 border rounded mb-2"
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />

                    <button
                        className="w-full bg-black text-white py-3 rounded-lg mt-2"
                        onClick={submitForm}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaintingModal;
