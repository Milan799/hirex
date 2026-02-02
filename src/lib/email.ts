import nodemailer from "nodemailer";

type SendOtpOptions = {
  to: string;
  code: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "Email transport is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your environment."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendOtpEmail({ to, code }: SendOtpOptions) {
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

  if (!from) {
    throw new Error("EMAIL_FROM or SMTP_USER must be set to send emails.");
  }

  const t = getTransporter();

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 16px; background: #020617; color: #e5e7eb;">
      <h2 style="color: #60a5fa;">HireX Password Reset</h2>
      <p>Use the following one-time passcode to reset your password. It is valid for <strong>10 minutes</strong>.</p>
      <div style="margin: 16px 0; padding: 12px 16px; display: inline-block; border-radius: 999px; background: #0f172a; border: 1px solid #1d4ed8; color: #e5e7eb; font-size: 20px; letter-spacing: 0.3em;">
        ${code}
      </div>
      <p style="font-size: 12px; color: #9ca3af;">If you did not request this, you can safely ignore this email.</p>
    </div>
  `;

  await t.sendMail({
    from,
    to,
    subject: "Your HireX password reset code",
    html,
  });
}

