// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, email, phone, paintingId, dimension, price } = await req.json();

//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST!,
//       port: Number(process.env.SMTP_PORT || 587),
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER!,
//         pass: process.env.SMTP_PASS!,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Art of Home" <${process.env.SMTP_USER}>`,
//       to: process.env.RECEIVER_EMAIL!,
//       subject: `New Painting Order - ${paintingId}`,
//       html: `
//         <h2>New Painting Purchase Request</h2>
//         <p><strong>Painting ID:</strong> ${paintingId}</p>
//         <p><strong>Dimension:</strong> ${dimension}</p>
//         <p><strong>Price:</strong> PKR ${price}</p>
//         <hr />
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email || "Not provided"}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Email send error:", error);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Art of Home Orders" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // SEND TO YOURSELF
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
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
