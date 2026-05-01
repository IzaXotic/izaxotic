import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Contact Form API ─────────────────────────────────────
   POST /api/contact
   
   Receives form data, sends an email to the site owner
   and a confirmation to the sender.
   
   Required env vars:
     SMTP_HOST     — e.g. smtp.hostinger.com or smtp.gmail.com
     SMTP_PORT     — e.g. 465
     SMTP_USER     — e.g. hello@izaxotic.com
     SMTP_PASS     — SMTP password or app password
     CONTACT_EMAIL — where to receive form submissions
   ───────────────────────────────────────────────────────── */

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

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // ── Email to site owner ──
    await transporter.sendMail({
      from: `"IzaXotic Contact Form" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `🚀 New Inquiry: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0B0F; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #7C3AED, #4C1D95); padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 0.05em;">
              ⚡ New Contact Submission
            </h1>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 12px; font-family: monospace;">
              SYS://CONTACT_FORM — ${new Date().toISOString()}
            </p>
          </div>
          
          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(124,58,237,0.15); color: #A78BFA; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace; width: 100px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(124,58,237,0.15); color: #E5E7EB; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(124,58,237,0.15); color: #A78BFA; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(124,58,237,0.15); color: #E5E7EB; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #7C3AED; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(124,58,237,0.15); color: #A78BFA; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(124,58,237,0.15); color: #E5E7EB; font-size: 15px;">${subject}</td>
              </tr>
            </table>

            <!-- Message -->
            <div style="margin-top: 24px; padding: 20px; background: rgba(124,58,237,0.06); border: 1px solid rgba(124,58,237,0.12); border-radius: 12px;">
              <p style="color: #A78BFA; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 8px; font-family: monospace;">Message</p>
              <p style="color: #D1D5DB; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <!-- Reply CTA -->
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
                style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #7C3AED, #4C1D95); color: white; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">
                Reply to ${name} →
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 16px 32px; border-top: 1px solid rgba(124,58,237,0.1); text-align: center;">
            <p style="color: #6B7280; font-size: 11px; margin: 0; font-family: monospace;">
              IzaXotic Contact System • izaxotic.com
            </p>
          </div>
        </div>
      `,
    });

    // ── Confirmation email to sender ──
    await transporter.sendMail({
      from: `"IzaXotic" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your message — IzaXotic`,
      html: `
        <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0B0F; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #7C3AED, #4C1D95); padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Thanks for reaching out, ${name}! 🚀</h1>
          </div>
          <div style="padding: 32px;">
            <p style="color: #D1D5DB; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              We've received your message about <strong style="color: #A78BFA;">"${subject}"</strong> and our team will get back to you within <strong style="color: white;">24 hours</strong>.
            </p>
            <p style="color: #9CA3AF; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">
              In the meantime, feel free to reply to this email if you have anything to add.
            </p>
            <div style="padding: 16px; background: rgba(124,58,237,0.06); border: 1px solid rgba(124,58,237,0.12); border-radius: 10px;">
              <p style="color: #6B7280; font-size: 12px; margin: 0; font-family: monospace;">Your message:</p>
              <p style="color: #D1D5DB; font-size: 13px; line-height: 1.6; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid rgba(124,58,237,0.1); text-align: center;">
            <p style="color: #6B7280; font-size: 11px; margin: 0;">
              IzaXotic — Custom Web Development & UI/UX Studio<br/>
              <a href="https://izaxotic.com" style="color: #7C3AED; text-decoration: none;">izaxotic.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
