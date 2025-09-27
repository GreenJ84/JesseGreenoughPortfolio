/** @format */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const USER_EMAIL = process.env.USER_EMAIL!;
const transporter =
nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER_EMAIL,
    pass: process.env.USER_PASS!,
  },
});

type EmailDetail = {
  name: string;
  sender: string;
  subject: string;
  message: string;
}
export async function POST(req: NextRequest) {
  console.log("Received email request");
  let body: EmailDetail;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json("Invalid request body", { status: 400 });
  }
  console.log("Processed email request");

    // Validate required fields
  if (!body.name || !body.sender || !body.message) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const mailOptions = {
    from: USER_EMAIL,
    to: process.env.CONTACT_EMAIL!,
    reply_to: body.sender,
    subject: body.subject || `Portfolio Contact from ${body.name}`,
    text: `${body.message}\n\n\r- sent from ${body.name}`,
    html: `
      <h1>New Portfolio Contact</h1>
      <h2><strong>Subject:</strong> ${body.subject}</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.sender}</p>
      <p><strong>Message:</strong></p>
      <p>${body.message.replace(/\n/g, '<br>')}</p>
    `,
  };
  console.log("Prepared email options");

  await transporter.sendMail(mailOptions)
    .catch((error) => {
      return NextResponse.json(
        { success: false, message: "Email not sent", error: error.message },
        { status: 500 }
      );
    });

  console.log("Email sent successfully");
  return NextResponse.json(
    { success: true, message: "Email sent", error: null },
    { status: 201 }
  );
}
