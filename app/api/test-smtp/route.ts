/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/test-smtp/route.ts
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

export async function POST(request: NextRequest) {
  try {
    console.log("Testing SMTP configuration...");
    console.log("Host:", process.env.SMTP_HOST);
    console.log("Port:", process.env.SMTP_PORT);
    console.log("User:", process.env.SMTP_USER);

    // Verify connection
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: "SMTP Test Email",
      text: "This is a test email to verify SMTP configuration.",
      html: "<p>This is a test email to verify SMTP configuration.</p>",
    });

    console.log("Test email sent:", info.messageId);

    return Response.json({
      message: "SMTP test successful",
      messageId: info.messageId,
      configuration: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
      },
    });
  } catch (error) {
    console.error("SMTP test failed:", error);
    return Response.json(
      {
        error: "SMTP test failed",
        details: error instanceof Error ? error.message : "Unknown error",
        configuration: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
        },
      },
      { status: 500 }
    );
  }
}
