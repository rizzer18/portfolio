import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 2,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export interface SendEmailOptions {
  subject: string;
  name: string;
  phone?: string;
  email: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const safeSubject = escapeHtml(options.subject.trim());
  const safeName = escapeHtml(options.name.trim());
  const safeEmail = escapeHtml(options.email.trim());
  const safePhone = options.phone ? escapeHtml(options.phone.trim()) : "";
  const safeMessage = escapeHtml(options.message.trim());

  await transport.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: options.email.trim(),
    subject: `[Portfolio] ${options.subject.trim()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #09090b; color: #e4e4e7; border-radius: 12px;">
        <h2 style="color: #fbbf24; margin-bottom: 4px;">Нове повідомлення з портфоліо</h2>
        <p style="color: #71717a; font-size: 13px; margin-top: 0;">Тема: <strong style="color: #e4e4e7;">${safeSubject}</strong></p>
        <hr style="border-color: #27272a; margin: 16px 0;" />

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #71717a; width: 120px;">Ім'я</td>
            <td style="padding: 8px 0; color: #e4e4e7;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #71717a;">Email</td>
            <td style="padding: 8px 0; color: #fbbf24;">
              <a href="mailto:${safeEmail}" style="color: #fbbf24;">${safeEmail}</a>
            </td>
          </tr>
          ${
            safePhone
              ? `<tr>
            <td style="padding: 8px 0; color: #71717a;">Телефон</td>
            <td style="padding: 8px 0; color: #e4e4e7;">${safePhone}</td>
          </tr>`
              : ""
          }
        </table>

        <hr style="border-color: #27272a; margin: 16px 0;" />

        <p style="color: #71717a; font-size: 13px; margin-bottom: 8px;">Повідомлення:</p>
        <div style="background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e4e4e7;">${safeMessage}</div>
      </div>
    `,
  });
}
