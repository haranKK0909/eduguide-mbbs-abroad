const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "https://eduguideeducationalservices.netlify.app";

/* =========================================
   RESEND CONFIGURATION
========================================= */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  "eduguideeducationservices@gmail.com";

/*
  IMPORTANT:

  For testing:
  EMAIL_FROM can be:
  EduGuide Website <onboarding@resend.dev>

  For production:
  Use an email address from your verified domain.

  Example:
  EduGuide Website <hello@yourdomain.com>
*/

const EMAIL_FROM =
  process.env.EMAIL_FROM ||
  "EduGuide Website <onboarding@resend.dev>";

const RESEND_API_URL = "https://api.resend.com/emails";


/* =========================================
   ALLOWED ORIGINS
========================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://eduguideeducationalservices.netlify.app",
  FRONTEND_URL
].filter(Boolean);


/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: (origin, callback) => {

      // Allow requests without origin
      // such as Render health checks
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    methods: ["GET", "POST", "OPTIONS"],

    allowedHeaders: [
      "Content-Type"
    ]
  })
);


/*
  JSON request body limit.
  Enquiry form doesn't need a large payload.
*/
app.use(
  express.json({
    limit: "100kb"
  })
);


/* =========================================
   RESEND CONFIG CHECK
========================================= */

if (!RESEND_API_KEY) {

  console.error(
    "❌ RESEND_API_KEY is missing."
  );

} else {

  console.log(
    "✅ Resend API key detected."
  );

}

console.log(
  `📧 Email recipient: ${ADMIN_EMAIL}`
);

console.log(
  `📨 Email sender: ${EMAIL_FROM}`
);


/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "EduGuide Backend is running 🚀"

  });

});


/* =========================================
   RESEND EMAIL FUNCTION
========================================= */

async function sendEmailWithResend({
  name,
  phone,
  email,
  country,
  academicStatus,
  message,
  pdfBuffer,
  fileName
}) {

  if (!RESEND_API_KEY) {

    throw new Error(
      "RESEND_API_KEY is not configured."
    );

  }


  /*
    Convert PDF Buffer to Base64.

    Resend accepts Base64 content
    for email attachments.
  */

  const pdfBase64 =
    pdfBuffer.toString("base64");


  /* =====================================
     EMAIL SUBJECT
  ====================================== */

  const subject =
    `New EduGuide Enquiry - ${name}`;


  /* =====================================
     PLAIN TEXT EMAIL
  ====================================== */

  const text = `
New enquiry received from EduGuide website.

Student Details
----------------------------

Name: ${name}

Phone: ${phone}

Email: ${email}

Preferred Country: ${country}

Academic Status: ${academicStatus}

Message:
${message}

----------------------------

EduGuide Educational Services
Tiruppur, Tamil Nadu
`;


  /* =====================================
     HTML EMAIL
  ====================================== */

  const html = `
<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>New EduGuide Enquiry</title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      max-width:650px;
      margin:30px auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
    "
  >

    <!-- HEADER -->

    <div
      style="
        background:linear-gradient(
          135deg,
          #0f766e,
          #2563eb
        );
        padding:28px;
        color:#ffffff;
        text-align:center;
      "
    >

      <h1
        style="
          margin:0;
          font-size:28px;
        "
      >
        EDUGUIDE
      </h1>

      <p
        style="
          margin:8px 0 0;
          font-size:13px;
          letter-spacing:1px;
        "
      >
        EDUCATIONAL SERVICES
      </p>

    </div>


    <!-- CONTENT -->

    <div
      style="
        padding:30px;
      "
    >

      <h2
        style="
          margin-top:0;
          color:#111827;
        "
      >
        New Student Enquiry
      </h2>


      <p
        style="
          color:#6b7280;
          font-size:14px;
        "
      >
        A new enquiry has been submitted
        through the EduGuide website.
      </p>


      <!-- STUDENT DETAILS -->

      <div
        style="
          margin-top:25px;
          border:1px solid #e5e7eb;
          border-radius:10px;
          overflow:hidden;
        "
      >

        <div
          style="
            padding:14px 18px;
            background:#f9fafb;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
            color:#111827;
          "
        >
          Student Details
        </div>


        <div
          style="
            padding:18px;
          "
        >

          <p>
            <strong>Full Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Phone Number:</strong>
            ${escapeHtml(phone)}
          </p>

          <p>
            <strong>Email Address:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Preferred Country:</strong>
            ${escapeHtml(country)}
          </p>

          <p>
            <strong>Academic Status:</strong>
            ${escapeHtml(academicStatus)}
          </p>

        </div>

      </div>


      <!-- MESSAGE -->

      <div
        style="
          margin-top:20px;
          padding:18px;
          background:#f9fafb;
          border-radius:10px;
        "
      >

        <strong
          style="
            color:#111827;
          "
        >
          Message
        </strong>

        <p
          style="
            margin-bottom:0;
            color:#374151;
            line-height:1.6;
            white-space:pre-wrap;
          "
        >
          ${escapeHtml(message)}
        </p>

      </div>


      <!-- PDF NOTICE -->

      <div
        style="
          margin-top:25px;
          padding:15px;
          background:#eff6ff;
          border-radius:8px;
          color:#1e40af;
          font-size:14px;
        "
      >

        📎 The complete enquiry details
        are attached as a PDF file.

      </div>

    </div>


    <!-- FOOTER -->

    <div
      style="
        padding:20px;
        background:#f9fafb;
        border-top:1px solid #e5e7eb;
        text-align:center;
        color:#6b7280;
        font-size:12px;
      "
    >

      <strong>
        EduGuide Educational Services
      </strong>

      <br>

      Tiruppur, Tamil Nadu

    </div>

  </div>

</body>

</html>
`;


  /* =====================================
     RESEND API REQUEST
  ====================================== */

  const controller =
    new AbortController();

  const timeout =
    setTimeout(() => {

      controller.abort();

    }, 20000);


  try {

    const response =
      await fetch(
        RESEND_API_URL,
        {
          method: "POST",

          headers: {
            "Authorization":
              `Bearer ${RESEND_API_KEY}`,

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            from:
              EMAIL_FROM,

            to: [
              ADMIN_EMAIL
            ],

            reply_to:
              email,

            subject:
              subject,

            html:
              html,

            text:
              text,

            attachments: [
              {
                filename:
                  fileName,

                content:
                  pdfBase64
              }
            ]

          }),

          signal:
            controller.signal
        }
      );


    clearTimeout(timeout);


    /* =====================================
       READ RESPONSE
    ====================================== */

    let result;

    try {

      result =
        await response.json();

    } catch {

      result = {};

    }


    /* =====================================
       RESEND ERROR
    ====================================== */

    if (!response.ok) {

      console.error(
        "❌ Resend API Error:",
        result
      );


      const resendMessage =
        result?.message ||
        result?.error ||
        `Resend request failed with status ${response.status}`;


      throw new Error(
        resendMessage
      );

    }


    /* =====================================
       SUCCESS
    ====================================== */

    console.log(
      "✅ Resend email sent successfully:",
      result?.id || "No email ID returned"
    );


    return result;


  } catch (error) {

    clearTimeout(timeout);


    if (
      error.name ===
      "AbortError"
    ) {

      throw new Error(
        "Resend email request timed out."
      );

    }


    throw error;

  }

}


/* =========================================
   HTML ESCAPE HELPER
========================================= */

function escapeHtml(value) {

  return String(value ?? "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================
   CREATE PDF BUFFER
========================================= */

function createEnquiryPDF({
  name,
  phone,
  email,
  country,
  academicStatus,
  message
}) {

  return new Promise(
    (resolve, reject) => {

      const doc =
        new PDFDocument({
          size: "A4",
          margin: 50
        });


      const chunks = [];


      /* ==============================
         COLLECT PDF DATA IN MEMORY
      ============================== */

      doc.on(
        "data",
        (chunk) => {

          chunks.push(chunk);

        }
      );


      doc.on(
        "end",
        () => {

          resolve(
            Buffer.concat(chunks)
          );

        }
      );


      doc.on(
        "error",
        reject
      );


      /* ==============================
         HEADER
      ============================== */

      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("#111111")
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


      /* ==============================
         TITLE
      ============================== */

      doc
        .fillColor("#111111")
        .fontSize(18)
        .font("Helvetica-Bold")
        .text(
          "Student Enquiry"
        );


      doc.moveDown(1);


      /* ==============================
         DATE
      ============================== */

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


      /* ==============================
         FIELD HELPER
      ============================== */

      const addField =
        (label, value) => {

          doc
            .fillColor("#111111")
            .fontSize(11)
            .font("Helvetica-Bold")
            .text(
              `${label}:`
            );


          doc
            .fillColor("#333333")
            .fontSize(11)
            .font("Helvetica")
            .text(
              value ||
              "Not provided"
            );


          doc.moveDown(0.8);

        };


      /* ==============================
         STUDENT DETAILS
      ============================== */

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


      /* ==============================
         MESSAGE
      ============================== */

      doc.moveDown(0.5);


      doc
        .fillColor("#111111")
        .fontSize(11)
        .font("Helvetica-Bold")
        .text(
          "Message:"
        );


      doc.moveDown(0.5);


      doc
        .fillColor("#333333")
        .fontSize(11)
        .font("Helvetica")
        .text(
          message ||
          "No message provided.",
          {
            lineGap: 5
          }
        );


      /* ==============================
         FOOTER
      ============================== */

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


      doc.text(
        "Tiruppur, Tamil Nadu",
        {
          align: "center"
        }
      );


      /* ==============================
         FINISH PDF
      ============================== */

      doc.end();

    }
  );

}


/* =========================================
   ENQUIRY API
========================================= */

app.post(
  "/api/enquiry",
  async (req, res) => {

    const startTime =
      Date.now();


    try {

      /* =====================================
         REQUEST DATA
      ====================================== */

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

          message:
            "Please fill all required fields."

        });

      }


      /* =====================================
         SANITIZE BASIC VALUES
      ====================================== */

      const cleanName =
        String(name)
          .trim()
          .substring(0, 100);


      const cleanPhone =
        String(phone)
          .trim()
          .substring(0, 30);


      const cleanEmail =
        String(email)
          .trim()
          .toLowerCase()
          .substring(0, 150);


      const cleanCountry =
        String(country)
          .trim()
          .substring(0, 100);


      const cleanAcademicStatus =
        String(academicStatus)
          .trim()
          .substring(0, 150);


      const cleanMessage =
        message
          ? String(message)
              .trim()
              .substring(0, 3000)
          : "No message provided.";


      /* =====================================
         BASIC EMAIL VALIDATION
      ====================================== */

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (
        !emailRegex.test(
          cleanEmail
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid email address."

        });

      }


      /* =====================================
         BASIC PHONE VALIDATION
      ====================================== */

      const phoneDigits =
        cleanPhone.replace(
          /\D/g,
          ""
        );


      if (
        phoneDigits.length < 10 ||
        phoneDigits.length > 15
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid phone number."

        });

      }


      /* =====================================
         PDF FILE NAME
      ====================================== */

      const safeName =
        cleanName
          .replace(
            /[^a-z0-9]/gi,
            "_"
          )
          .substring(
            0,
            40
          );


      const timestamp =
        Date.now();


      const fileName =
        `EduGuide_Enquiry_${safeName}_${timestamp}.pdf`;


      /* =====================================
         CREATE PDF IN MEMORY
         
         NO DISK WRITE
         NO fs
         NO unlink
      ====================================== */

      const pdfBuffer =
        await createEnquiryPDF({

          name:
            cleanName,

          phone:
            cleanPhone,

          email:
            cleanEmail,

          country:
            cleanCountry,

          academicStatus:
            cleanAcademicStatus,

          message:
            cleanMessage

        });


      /* =====================================
         SEND EMAIL USING RESEND
      ====================================== */

      await sendEmailWithResend({

        name:
          cleanName,

        phone:
          cleanPhone,

        email:
          cleanEmail,

        country:
          cleanCountry,

        academicStatus:
          cleanAcademicStatus,

        message:
          cleanMessage,

        pdfBuffer:
          pdfBuffer,

        fileName:
          fileName

      });


      /* =====================================
         SUCCESS
      ====================================== */

      const duration =
        Date.now() -
        startTime;


      console.log(
        `✅ Enquiry sent: ${cleanName} | ${duration}ms`
      );


      return res.status(200).json({

        success: true,

        message:
          "Enquiry submitted successfully."

      });


    } catch (error) {

      const duration =
        Date.now() -
        startTime;


      console.error(
        `❌ Enquiry Error after ${duration}ms:`,
        error.message
      );


      return res.status(500).json({

        success: false,

        message:
          "Something went wrong while submitting the enquiry."

      });

    }

  }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `🚀 EduGuide Backend running on port ${PORT}`
    );


    console.log(
      `🌐 Frontend allowed: ${FRONTEND_URL}`
    );


    console.log(
      `📧 Resend email service enabled`
    );

  }
);