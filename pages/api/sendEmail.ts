/** @format */

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request recievied")
  const email = process.env.USER_EMAIL!;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: process.env.USER_PASS!,
    },
  });
  const { name, sender, subject, message } = req.body;
  const mailOptions = {
    from: sender,
    to: email,
    subject: subject,
    text: `${message} - sent from ${name}`,
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
