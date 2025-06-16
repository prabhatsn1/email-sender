import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error) => {
  if (error) {
    console.error("SMTP configuration error:", error);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

// Helper function to replace company name placeholders
function replaceCompanyName(text: string, companyName: string): string {
  return text.replace(/CompanyName/g, companyName);
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const emailDataRaw = formData.get("emailData") as string;
    const resumeFile = formData.get("resume") as File;

    // Validate required fields
    if (!emailDataRaw || !resumeFile) {
      return Response.json(
        { error: "Missing required fields: emailData or resume" },
        { status: 400 }
      );
    }

    // Parse email data
    let emailData;
    try {
      emailData = JSON.parse(emailDataRaw);
    } catch {
      return Response.json(
        { error: "Invalid JSON in emailData" },
        { status: 400 }
      );
    }

    // Validate email data structure
    if (!Array.isArray(emailData) || emailData.length === 0) {
      return Response.json(
        { error: "emailData must be a non-empty array" },
        { status: 400 }
      );
    }

    // Validate each email entry
    for (const entry of emailData) {
      if (!entry.email || !entry.subject || !entry.content) {
        return Response.json(
          { error: "Each email entry must have email, subject, and content" },
          { status: 400 }
        );
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(entry.email)) {
        return Response.json(
          { error: `Invalid email format: ${entry.email}` },
          { status: 400 }
        );
      }
    }

    // Validate file type
    if (resumeFile.type !== "application/pdf") {
      return Response.json(
        { error: "Resume must be a PDF file" },
        { status: 400 }
      );
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > maxSize) {
      return Response.json(
        { error: "Resume file too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    //  // Create uploads directory if it doesn't exist
    //  const uploadsDir = path.join(process.cwd(), "uploads");
    //  try {
    //    await fs.access(uploadsDir);
    //  } catch {
    //    await fs.mkdir(uploadsDir, { recursive: true });
    //  }

    // Use Vercel's temporary storage directory
    const uploadsDir = "/tmp";
    const timestamp = Date.now();
    const resumeFileName = `resume_${timestamp}.pdf`;
    const resumeFilePath = path.join(uploadsDir, resumeFileName);

    // Save resume file temporarily
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    await fs.writeFile(resumeFilePath, resumeBuffer);

    const results = [];
    const errors = [];

    // Send emails
    for (const recipient of emailData) {
      try {
        // Replace CompanyName placeholders in subject and content
        const personalizedSubject = replaceCompanyName(
          recipient.subject,
          recipient.company
        );
        const personalizedContent = replaceCompanyName(
          recipient.content,
          recipient.company
        );

        const info = await transporter.sendMail({
          from: process.env.SMTP_FROM_EMAIL,
          to: recipient.email,
          subject: personalizedSubject,
          text: personalizedContent,
          html: personalizedContent.replace(/\n/g, "<br>"), // Basic HTML conversion
          attachments: [
            {
              filename: "resume.pdf",
              path: resumeFilePath,
              contentType: "application/pdf",
            },
          ],
        });

        results.push({
          email: recipient.email,
          companyName: recipient.company,
          success: true,
          messageId: info.messageId,
          personalizedSubject,
        });

        console.log(
          `Email sent to ${recipient.email} (${recipient.company}): ${info.messageId}`
        );
      } catch (emailError: unknown) {
        const errorMessage =
          emailError instanceof Error
            ? emailError.message
            : "Unknown error occurred";
        console.error(
          `Failed to send email to ${recipient.email} (${recipient.company}):`,
          emailError
        );
        errors.push({
          email: recipient.email,
          companyName: recipient.company,
          error: errorMessage,
        });
      }
    }

    // Clean up temporary file
    try {
      await fs.unlink(resumeFilePath);
    } catch (cleanupError) {
      console.error("Failed to clean up temporary file:", cleanupError);
    }

    // Return results
    const successCount = results.length;
    const errorCount = errors.length;

    if (errorCount === 0) {
      return Response.json({
        message: `All ${successCount} emails sent successfully`,
        results,
      });
    } else if (successCount === 0) {
      return Response.json(
        {
          error: "All emails failed to send",
          errors,
        },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          message: `${successCount} emails sent, ${errorCount} failed`,
          results,
          errors,
        },
        { status: 207 } // Multi-status
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
