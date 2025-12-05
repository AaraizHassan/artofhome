// /src/app/api/send-form/route.ts
import nodemailer from "nodemailer";

export async function POST(req) {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: "Website Orders",
        to: process.env.MY_EMAIL,
        subject: `New Painting Request - ${data.paintingId}`,
        text: `
Painting ID: ${data.paintingId}
Dimension: ${data.dimension}
Price: Rs. ${data.price}
Advance: Rs. ${data.advance}

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
        `,
    });

    return new Response("OK");
}
