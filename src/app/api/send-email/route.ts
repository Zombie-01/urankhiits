// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { name, phone, email, message } = req.body;

    // Create a transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false
      },

      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS // Your Gmail password
      }
    });
    console.log({
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS // Your Gmail password
    });
    // Email options
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECEIVING_EMAIL, // The email address to receive the form data
      subject: "Contact Us Form Submission",
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
