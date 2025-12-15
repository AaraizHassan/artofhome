import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      paintingId,
      dimension,
      totalAmount,
      advanceAmount,
    } = await req.json();

    await resend.emails.send({
      from: "Art of Home Orders <orders@resend.dev>",
      to: ["ayeshach112299@gmail.com"], // OWNER EMAIL
      subject: `🖼️ New Painting Order — ${paintingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Painting Order Received</h2>
          <hr />

          <h3>Painting Details</h3>
          <p><strong>Painting ID:</strong> ${paintingId}</p>
          <p><strong>Selected Dimension:</strong> ${dimension}</p>
          <p><strong>Total Amount:</strong> PKR ${totalAmount}</p>
          <p><strong>50% Advance:</strong> PKR ${advanceAmount}</p>

          <hr />

          <h3>Customer Details</h3>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${phone}</p>

          <br />
          <p>📌 Please contact the customer to confirm the order.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
