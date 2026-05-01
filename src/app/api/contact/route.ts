import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check env vars are configured
    const missing = [];
    if (!process.env.SMTP_HOST) missing.push("SMTP_HOST");
    if (!process.env.SMTP_USER) missing.push("SMTP_USER");
    if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Server config missing: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    const port = Number(process.env.SMTP_PORT) || 465;

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // Send email to site owner
    await transporter.sendMail({
      from: `"IzaXotic Contact" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New Inquiry: ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0B0F; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #7C3AED, #4C1D95); padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Submission</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 12px;">${new Date().toISOString()}</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2e; color: #A78BFA; font-size: 11px; text-transform: uppercase; width: 100px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2e; color: #E5E7EB;">${name}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2e; color: #A78BFA; font-size: 11px; text-transform: uppercase;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2e; color: #E5E7EB;"><a href="mailto:${email}" style="color: #7C3AED;">${email}</a></td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2e; color: #A78BFA; font-size: 11px; text-transform: uppercase;">Subject</td><td style="padding: 12px 0; border-bottom: 1px solid #1a1a2e; color: #E5E7EB;">${subject}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: rgba(124,58,237,0.06); border: 1px solid rgba(124,58,237,0.12); border-radius: 12px;">
              <p style="color: #A78BFA; font-size: 10px; text-transform: uppercase; margin: 0 0 8px;">Message</p>
              <p style="color: #D1D5DB; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #7C3AED, #4C1D95); color: white; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Contact form error:", errMsg);
    return NextResponse.json(
      { error: `Email failed: ${errMsg}` },
      { status: 500 }
    );
  }
}

