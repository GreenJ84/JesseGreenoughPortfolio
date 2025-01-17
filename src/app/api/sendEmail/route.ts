/** @format */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL = process.env.USER_EMAIL!;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
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
  let body: EmailDetail;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json("Invalid request body", { status: 400 });
  }

  const mailOptions = {
    from: body.sender,
    to: EMAIL,
    subject: body.subject,
    text: `${body.message}\n\n\r- sent from ${body.name}`,
  };

  return transporter.sendMail(mailOptions, function (error) {
    if (error) {
      return NextResponse.json(
        { success: false, message: "Email not sent", error: error },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Email sent", error: null },
      { status: 201 }
    );
  });
}
