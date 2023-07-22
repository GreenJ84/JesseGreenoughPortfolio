/** @format */

import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const email = process.env.USER_EMAIL!;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: process.env.USER_PASS!,
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return "Bad Request";
  }

  const { name, sender, subject, message } = req.body;

  const mailOptions = {
    from: sender,
    to: email,
    subject: subject,
    text: `${message}\n\n\r- sent from ${name}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Email not sent", error: error });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent", error: null });
    }
  });
}
