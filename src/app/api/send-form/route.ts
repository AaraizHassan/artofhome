// // /src/app/api/send-form/route.ts


// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//     const body = await req.json();

//     try {
//         await resend.emails.send({
//             from: "Art of Home <yourdomain@resend.dev>",
//             to: "your_email@gmail.com",
//             subject: `New Painting Order - ID: ${body.paintingId}`,
//             html: `
//                 <h2>New Painting Order</h2>
//                 <p><strong>Name:</strong> ${body.name}</p>
//                 <p><strong>Email:</strong> ${body.email}</p>
//                 <p><strong>Phone:</strong> ${body.phone}</p>
//                 <p><strong>Painting ID:</strong> ${body.paintingId}</p>
//                 <p><strong>Selected Size:</strong> ${body.dimension}</p>
//                 <p><strong>Price:</strong> ${body.price}</p>
//                 <p><strong>50% Advance:</strong> ${body.advance}</p>
//             `,
//         });

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 });
//     }
// }


// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     // Create SMTP transporter (example: Brevo SMTP)
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST!,
//       port: parseInt(process.env.SMTP_PORT || "587"),
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER!,
//         pass: process.env.SMTP_PASS!,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Website Contact" <${process.env.SMTP_USER}>`,
//       to: process.env.RECEIVER_EMAIL!,
//       subject: "New Contact Form Submission",
//       html: `
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Email error:", error);
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

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
//       from: `"Website Contact" <${process.env.SMTP_USER}>`,
//       to: process.env.RECEIVER_EMAIL!,
//       subject: "New Contact Form Submission",
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Email error:", error);
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   }
// }


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
