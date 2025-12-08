
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, paintingId, dimension, price } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"Art of Home" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL!,
      subject: `New Painting Order - ${paintingId}`,
      html: `
        <h2>New Painting Purchase Request</h2>
        <p><strong>Painting ID:</strong> ${paintingId}</p>
        <p><strong>Dimension:</strong> ${dimension}</p>
        <p><strong>Price:</strong> PKR ${price}</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
