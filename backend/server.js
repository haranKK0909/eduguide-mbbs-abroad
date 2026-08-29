const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(express.json());


/* =========================================
   EMAIL CONFIGURATION
========================================= */

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


/* =========================================
   TEST EMAIL CONNECTION
========================================= */

transporter.verify((error) => {

  if (error) {
    console.log("❌ Email configuration error:");
    console.log(error.message);
  } else {
    console.log("✅ Gmail server is ready.");
  }

});


/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "EduGuide Backend is running 🚀"
  });

});


/* =========================================
   ENQUIRY API
========================================= */

app.post("/api/enquiry", async (req, res) => {

  try {

    const {
      name,
      phone,
      email,
      country,
      academicStatus,
      message
    } = req.body;


    /* =====================================
       VALIDATION
    ====================================== */

    if (
      !name ||
      !phone ||
      !email ||
      !country ||
      !academicStatus
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });

    }


    /* =====================================
       PDF FOLDER
    ====================================== */

    const pdfFolder = path.join(
      __dirname,
      "enquiries"
    );

    if (!fs.existsSync(pdfFolder)) {

      fs.mkdirSync(
        pdfFolder,
        { recursive: true }
      );

    }


    /* =====================================
       PDF FILE NAME
    ====================================== */

    const safeName = name
      .replace(/[^a-z0-9]/gi, "_")
      .substring(0, 40);

    const timestamp =
      Date.now();

    const fileName =
      `EduGuide_Enquiry_${safeName}_${timestamp}.pdf`;

    const pdfPath =
      path.join(
        pdfFolder,
        fileName
      );


    /* =====================================
       CREATE PDF
    ====================================== */

    const doc =
      new PDFDocument({
        size: "A4",
        margin: 50
      });

    const writeStream =
      fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);


    /* HEADER */

    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text(
        "EDUGUIDE",
        {
          align: "center"
        }
      );

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#666666")
      .text(
        "EDUCATIONAL SERVICES",
        {
          align: "center"
        }
      );

    doc.moveDown(2);


    /* TITLE */

    doc
      .fillColor("#111111")
      .fontSize(18)
      .font("Helvetica-Bold")
      .text(
        "Student Enquiry"
      );

    doc.moveDown(1);


    /* DATE */

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#666666")
      .text(
        `Submitted on: ${new Date().toLocaleString(
          "en-IN"
        )}`
      );

    doc.moveDown(2);


    /* DETAILS */

    const addField = (
      label,
      value
    ) => {

      doc
        .fillColor("#111111")
        .fontSize(11)
        .font("Helvetica-Bold")
        .text(`${label}:`);

      doc
        .fillColor("#333333")
        .fontSize(11)
        .font("Helvetica")
        .text(value || "Not provided");

      doc.moveDown(0.8);

    };


    addField(
      "Full Name",
      name
    );

    addField(
      "Phone Number",
      phone
    );

    addField(
      "Email Address",
      email
    );

    addField(
      "Preferred Country",
      country
    );

    addField(
      "Academic Status",
      academicStatus
    );


    /* MESSAGE */

    doc.moveDown(0.5);

    doc
      .fillColor("#111111")
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Message:");

    doc.moveDown(0.5);

    doc
      .fillColor("#333333")
      .fontSize(11)
      .font("Helvetica")
      .text(
        message || "No message provided.",
        {
          lineGap: 5
        }
      );


    /* FOOTER */

    doc.moveDown(3);

    doc
      .fontSize(9)
      .fillColor("#777777")
      .text(
        "EduGuide Educational Services",
        {
          align: "center"
        }
      );

    doc
      .text(
        "Tiruppur, Tamil Nadu",
        {
          align: "center"
        }
      );


    doc.end();


    /* =====================================
       WAIT FOR PDF CREATION
    ====================================== */

    await new Promise(
      (resolve, reject) => {

        writeStream.on(
          "finish",
          resolve
        );

        writeStream.on(
          "error",
          reject
        );

      }
    );


    /* =====================================
       EMAIL
    ====================================== */

    await transporter.sendMail({

      from: `"EduGuide Website" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject:
        `New EduGuide Enquiry - ${name}`,

      text: `
New enquiry received from EduGuide website.

Name: ${name}
Phone: ${phone}
Email: ${email}
Preferred Country: ${country}
Academic Status: ${academicStatus}

Message:
${message || "No message provided."}
      `,

      attachments: [
        {
          filename: fileName,
          path: pdfPath
        }
      ]

    });


    console.log(
      `✅ Enquiry email sent successfully for ${name}`
    );


    /* =====================================
       DELETE TEMP PDF
    ====================================== */

    fs.unlink(
      pdfPath,
      (error) => {

        if (error) {

          console.log(
            "⚠️ Could not delete temporary PDF:",
            error.message
          );

        }

      }
    );


    /* =====================================
       SUCCESS RESPONSE
    ====================================== */

    return res.status(200).json({

      success: true,

      message:
        "Enquiry submitted successfully."

    });


  } catch (error) {

    console.error(
      "❌ Enquiry Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Something went wrong while submitting the enquiry."

    });

  }

});


/* =========================================
   START SERVER
========================================= */

app.listen(
  PORT,
  () => {

    console.log(
      `🚀 EduGuide Backend running at http://localhost:${PORT}`
    );

  }
);