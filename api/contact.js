const nodemailer = require("nodemailer");

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return json(res, 400, { error: "Missing required fields" });
    }
    if (!isValidEmail(email)) {
      return json(res, 400, { error: "Invalid email" });
    }

    // Required environment variables on Vercel:
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return json(res, 500, {
        error:
          "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in Vercel env vars.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const to = ["aaryangusain134@gmail.com", "jaisingh9999@gmail.com"];
    const safeSubject = String(subject).slice(0, 200);

    const text = [
      "New message from Tour contact form",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      String(message),
    ].join("\n");

    await transporter.sendMail({
      from: `"Tour Contact" <${SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `[Tour] ${safeSubject}`,
      text,
    });

    return json(res, 200, { ok: true });
  } catch (err) {
    return json(res, 500, { error: "Failed to send email" });
  }
};


