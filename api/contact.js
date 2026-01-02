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
    const { name, email, subject, reason, message } = req.body || {};
    const resolvedSubject = subject || reason;

    // Only require the truly required fields.
    // `message` is optional in the UI and `reason` is the UI's "subject".
    if (!name || !email || !resolvedSubject) {
      return json(res, 400, { error: "Missing required fields" });
    }
    if (!isValidEmail(email)) {
      return json(res, 400, { error: "Invalid email" });
    }

    // Required environment variable on Vercel: RESEND_API_KEY
    const { RESEND_API_KEY } = process.env;
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set in environment variables");
      return json(res, 500, {
        error: "Email is not configured. Set RESEND_API_KEY in Vercel env vars.",
      });
    }

    const to = ["aaryangusain134@gmail.com", "jaisingh9999@gmail.com"];
    const safeSubject = String(resolvedSubject).slice(0, 200);

    const text = [
      "New message from Tour contact form",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${resolvedSubject}`,
      "",
      "Message:",
      String(message || "(no message provided)"),
    ].join("\n");

    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tour <team@tourtravel.life>",
        to,
        reply_to: email,
        subject: `[Tour] ${safeSubject}`,
        text,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", {
        status: resendResponse.status,
        statusText: resendResponse.statusText,
        body: resendData,
      });
      return json(res, 500, {
        error: `Failed to send email: ${resendData.message || resendResponse.statusText}`,
      });
    }

    console.log("Email sent successfully via Resend:", resendData.id);
    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("Unexpected error in contact handler:", err);
    return json(res, 500, {
      error: `Failed to send email: ${err.message || "Unknown error"}`,
    });
  }
};


