const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PDFDocument = require("pdfkit");

dotenv.config();

const app = express();

/* =========================================
   CONFIGURATION
========================================= */

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "https://eduguideeducationalservices.netlify.app";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
console.log("🔐 Admin configuration check:", {
  adminEmail: ADMIN_EMAIL,
  hashLoaded: Boolean(ADMIN_PASSWORD_HASH),
  hashLength: ADMIN_PASSWORD_HASH
    ? ADMIN_PASSWORD_HASH.length
    : 0,
  hashPrefix: ADMIN_PASSWORD_HASH
    ? ADMIN_PASSWORD_HASH.substring(0, 7)
    : "MISSING",
  jwtLoaded: Boolean(JWT_SECRET),
});
/* =========================================
   REQUIRED ENVIRONMENT VARIABLES
========================================= */

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing.");
  process.exit(1);
}

if (!ADMIN_EMAIL) {
  console.error("❌ ADMIN_EMAIL is missing.");
  process.exit(1);
}

if (!ADMIN_PASSWORD_HASH) {
  console.error("❌ ADMIN_PASSWORD_HASH is missing.");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing.");
  process.exit(1);
}

/* =========================================
   POSTGRESQL
========================================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  max: 10,

  idleTimeoutMillis: 30000,

  connectionTimeoutMillis: 10000,
});

console.log("🗄️ PostgreSQL configuration loaded.");

pool.on("error", (error) => {
  console.error(
    "❌ Unexpected PostgreSQL pool error:",
    error.message
  );
});

/* =========================================
   CORS
========================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://eduguideeducationalservices.netlify.app",
  FRONTEND_URL,
].filter(Boolean);

console.log("🌐 Allowed CORS origins:");
allowedOrigins.forEach((origin) => {
  console.log(`   - ${origin}`);
});

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin header.
      // Useful for health checks/server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }

      console.warn(`⚠️ CORS blocked origin: ${origin}`);

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    optionsSuccessStatus: 204,
  })
);

/* =========================================
   BODY PARSERS
========================================= */

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(cookieParser());

/* =========================================
   HELPER FUNCTIONS
========================================= */

function cleanString(value, maxLength) {
  return String(value ?? "")
    .trim()
    .substring(0, maxLength);
}

function isValidEmail(email) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");

  return (
    digits.length >= 10 &&
    digits.length <= 15
  );
}

/* =========================================
   ADMIN JWT
========================================= */

function createAdminToken() {
  return jwt.sign(
    {
      role: "admin",
      email: ADMIN_EMAIL,
    },
    JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
}

/* =========================================
   ADMIN AUTH MIDDLEWARE
========================================= */

function requireAdmin(req, res, next) {
  try {
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    if (
      decoded.role !== "admin" ||
      decoded.email !== ADMIN_EMAIL
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Admin session expired or invalid.",
    });
  }
}

/* =========================================
   DATABASE INITIALIZATION
========================================= */

async function initializeDatabase() {
  try {
    await pool.query("SELECT NOW()");

    console.log("✅ PostgreSQL connected.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        phone VARCHAR(30) NOT NULL,

        email VARCHAR(150) NOT NULL,

        country VARCHAR(100) NOT NULL,

        academic_status VARCHAR(150) NOT NULL,

        message TEXT DEFAULT 'No message provided.',

        status VARCHAR(30) NOT NULL DEFAULT 'New',

        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Enquiries table ready.");

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_enquiries_status
      ON enquiries(status);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_enquiries_created_at
      ON enquiries(created_at DESC);
    `);

    console.log("✅ Enquiry indexes ready.");
  } catch (error) {
    console.error(
      "❌ PostgreSQL initialization failed:",
      error.message
    );

    process.exit(1);
  }
}

/* =========================================
   ROOT HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduGuide Backend is running 🚀",
  });
});

/* =========================================
   DATABASE HEALTH CHECK
========================================= */

app.get(
  "/api/health",
  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT NOW() AS current_time"
      );

      res.status(200).json({
        success: true,
        message:
          "Backend and PostgreSQL are connected ✅",
        database: "PostgreSQL",
        time: result.rows[0].current_time,
      });
    } catch (error) {
      console.error(
        "❌ Database health check failed:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Database connection failed.",
      });
    }
  }
);

/* =========================================
   CUSTOMER ENQUIRY
========================================= */

app.post(
  "/api/enquiry",
  async (req, res) => {
    const startTime = Date.now();

    try {
      const {
        name,
        phone,
        email,
        country,
        academicStatus,
        message,
      } = req.body || {};

      /* -------------------------------------
         REQUIRED FIELDS
      ------------------------------------- */

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
            "Please fill all required fields.",
        });
      }

      /* -------------------------------------
         CLEAN DATA
      ------------------------------------- */

      const cleanName =
        cleanString(name, 100);

      const cleanPhone =
        cleanString(phone, 30);

      const cleanEmail =
        cleanString(email, 150)
          .toLowerCase();

      const cleanCountry =
        cleanString(country, 100);

      const cleanAcademicStatus =
        cleanString(
          academicStatus,
          150
        );

      const cleanMessage = message
        ? cleanString(message, 3000)
        : "No message provided.";

      /* -------------------------------------
         VALIDATION
      ------------------------------------- */

      if (
        !cleanName ||
        !cleanPhone ||
        !cleanEmail ||
        !cleanCountry ||
        !cleanAcademicStatus
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide valid enquiry details.",
        });
      }

      if (!isValidEmail(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address.",
        });
      }

      if (!isValidPhone(cleanPhone)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid phone number.",
        });
      }

      /* -------------------------------------
         INSERT INTO POSTGRESQL
      ------------------------------------- */

      const query = `
        INSERT INTO enquiries (
          name,
          phone,
          email,
          country,
          academic_status,
          message,
          status
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7
        )
        RETURNING
          id,
          name,
          phone,
          email,
          country,
          academic_status,
          message,
          status,
          created_at,
          updated_at;
      `;

      const values = [
        cleanName,
        cleanPhone,
        cleanEmail,
        cleanCountry,
        cleanAcademicStatus,
        cleanMessage,
        "New",
      ];

      const result = await pool.query(
        query,
        values
      );

      const enquiry = result.rows[0];

      const duration =
        Date.now() - startTime;

      console.log(
        `✅ Enquiry saved: #${enquiry.id} | ${enquiry.name} | ${duration}ms`
      );

      return res.status(201).json({
        success: true,
        message:
          "Enquiry submitted successfully.",
        enquiryId: enquiry.id,
      });
    } catch (error) {
      const duration =
        Date.now() - startTime;

      console.error(
        `❌ Enquiry Error after ${duration}ms:`,
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while submitting the enquiry.",
      });
    }
  }
);

/* =========================================
   ADMIN LOGIN
========================================= */

app.post(
  "/api/admin/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body || {};

      /* -------------------------------------
         VALIDATION
      ------------------------------------- */

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message:
            "Email and password are required.",
        });
      }

      const cleanEmail =
        String(email)
          .trim()
          .toLowerCase();

      /* -------------------------------------
         EMAIL CHECK
      ------------------------------------- */

      if (
        cleanEmail !==
        ADMIN_EMAIL.toLowerCase()
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password.",
        });
      }

      /* -------------------------------------
         PASSWORD CHECK
      ------------------------------------- */

      const passwordValid =
        await bcrypt.compare(
          String(password),
          ADMIN_PASSWORD_HASH
        );

      if (!passwordValid) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password.",
        });
      }

      /* -------------------------------------
         CREATE JWT
      ------------------------------------- */

      const token =
        createAdminToken();

      /* -------------------------------------
         SECURE HTTP-ONLY COOKIE
      ------------------------------------- */

      const isProduction =
        process.env.NODE_ENV ===
        "production";

      res.cookie(
        "admin_token",
        token,
        {
          httpOnly: true,

          secure: isProduction,

          sameSite: isProduction
            ? "none"
            : "lax",

          maxAge:
            8 * 60 * 60 * 1000,

          path: "/",
        }
      );

      console.log(
        "✅ Admin login successful."
      );

      return res.status(200).json({
        success: true,
        message:
          "Admin login successful.",
        admin: {
          email: ADMIN_EMAIL,
          role: "admin",
        },
      });
    } catch (error) {
      console.error(
        "❌ Admin login error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to login.",
      });
    }
  }
);

/* =========================================
   ADMIN LOGOUT
========================================= */

app.post(
  "/api/admin/logout",
  (req, res) => {
    const isProduction =
      process.env.NODE_ENV ===
      "production";

    res.clearCookie(
      "admin_token",
      {
        httpOnly: true,

        secure: isProduction,

        sameSite: isProduction
          ? "none"
          : "lax",

        path: "/",
      }
    );

    console.log(
      "✅ Admin logged out."
    );

    return res.status(200).json({
      success: true,
      message:
        "Admin logged out successfully.",
    });
  }
);

/* =========================================
   ADMIN SESSION CHECK
========================================= */

app.get(
  "/api/admin/me",
  requireAdmin,
  (req, res) => {
    return res.status(200).json({
      success: true,
      authenticated: true,
      admin: {
        email: req.admin.email,
        role: "admin",
      },
    });
  }
);

/* =========================================
   ADMIN — GET ALL ENQUIRIES
========================================= */

app.get(
  "/api/admin/enquiries",
  requireAdmin,
  async (req, res) => {
    try {
      const {
        status,
        search,
      } = req.query;

      let query = `
        SELECT
          id,
          name,
          phone,
          email,
          country,
          academic_status,
          message,
          status,
          created_at,
          updated_at
        FROM enquiries
      `;

      const values = [];
      const conditions = [];

      /* -------------------------------------
         STATUS FILTER
      ------------------------------------- */

      if (status) {
        values.push(
          String(status)
        );

        conditions.push(
          `status = $${values.length}`
        );
      }

      /* -------------------------------------
         SEARCH
      ------------------------------------- */

      if (search) {
        const searchValue =
          `%${String(search).trim()}%`;

        values.push(searchValue);

        const index =
          values.length;

        conditions.push(`
          (
            name ILIKE $${index}
            OR phone ILIKE $${index}
            OR email ILIKE $${index}
            OR country ILIKE $${index}
          )
        `);
      }

      /* -------------------------------------
         WHERE
      ------------------------------------- */

      if (conditions.length > 0) {
        query +=
          " WHERE " +
          conditions.join(
            " AND "
          );
      }

      /* -------------------------------------
         ORDER
      ------------------------------------- */

      query += `
        ORDER BY created_at DESC
      `;

      const result =
        await pool.query(
          query,
          values
        );

      return res.status(200).json({
        success: true,
        total:
          result.rows.length,
        enquiries:
          result.rows,
      });
    } catch (error) {
      console.error(
        "❌ Admin enquiries error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to fetch enquiries.",
      });
    }
  }
);

/* =========================================
   ADMIN — GET SINGLE ENQUIRY
========================================= */

app.get(
  "/api/admin/enquiries/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid enquiry ID.",
        });
      }

      const result =
        await pool.query(
          `
            SELECT
              id,
              name,
              phone,
              email,
              country,
              academic_status,
              message,
              status,
              created_at,
              updated_at
            FROM enquiries
            WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found.",
        });
      }

      return res.status(200).json({
        success: true,
        enquiry:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "❌ Admin single enquiry error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve enquiry.",
      });
    }
  }
);

/* =========================================
   ADMIN — UPDATE STATUS
========================================= */

app.patch(
  "/api/admin/enquiries/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid enquiry ID.",
        });
      }

      const {
        status,
      } = req.body || {};

      const allowedStatuses = [
        "New",
        "Contacted",
        "Follow-up",
        "Closed",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid enquiry status.",
          allowedStatuses,
        });
      }

      const result =
        await pool.query(
          `
            UPDATE enquiries
            SET
              status = $1,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING
              id,
              name,
              phone,
              email,
              country,
              academic_status,
              message,
              status,
              created_at,
              updated_at;
          `,
          [
            status,
            id,
          ]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found.",
        });
      }

      console.log(
        `✅ Enquiry #${id} status updated to ${status}`
      );

      return res.status(200).json({
        success: true,
        message:
          "Enquiry status updated successfully.",
        enquiry:
          result.rows[0],
      });
    } catch (error) {
      console.error(
        "❌ Update enquiry error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update enquiry.",
      });
    }
  }
);

/* =========================================
   ADMIN — DELETE ENQUIRY
========================================= */

app.delete(
  "/api/admin/enquiries/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid enquiry ID.",
        });
      }

      const result =
        await pool.query(
          `
            DELETE FROM enquiries
            WHERE id = $1
            RETURNING id, name;
          `,
          [id]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found.",
        });
      }

      console.log(
        `🗑️ Enquiry deleted: #${id} | ${result.rows[0].name}`
      );

      return res.status(200).json({
        success: true,
        message:
          "Enquiry deleted successfully.",
        deletedId: id,
      });
    } catch (error) {
      console.error(
        "❌ Delete enquiry error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete enquiry.",
      });
    }
  }
);

/* =========================================
   CREATE ENQUIRY PDF
========================================= */

function createEnquiryPDF(enquiry) {
  return new Promise(
    (resolve, reject) => {
      const doc =
        new PDFDocument({
          size: "A4",
          margin: 50,
        });

      const chunks = [];

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

      /* -------------------------------------
         HEADER
      ------------------------------------- */

      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("#111111")
        .text(
          "EDUGUIDE",
          {
            align: "center",
          }
        );

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#666666")
        .text(
          "EDUCATIONAL SERVICES",
          {
            align: "center",
          }
        );

      doc.moveDown(2);

      /* -------------------------------------
         TITLE
      ------------------------------------- */

      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor("#111111")
        .text("Student Enquiry");

      doc.moveDown();

      doc
        .fontSize(10)
        .font("Helvetica")
        .fillColor("#666666")
        .text(
          `Generated on: ${new Date().toLocaleString(
            "en-IN"
          )}`
        );

      doc.moveDown(2);

      /* -------------------------------------
         FIELD HELPER
      ------------------------------------- */

      const addField = (
        label,
        value
      ) => {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor("#111111")
          .text(
            `${label}:`
          );

        doc
          .fontSize(11)
          .font("Helvetica")
          .fillColor("#333333")
          .text(
            value ||
              "Not provided"
          );

        doc.moveDown(0.8);
      };

      /* -------------------------------------
         DETAILS
      ------------------------------------- */

      addField(
        "Enquiry ID",
        String(enquiry.id)
      );

      addField(
        "Full Name",
        enquiry.name
      );

      addField(
        "Phone Number",
        enquiry.phone
      );

      addField(
        "Email Address",
        enquiry.email
      );

      addField(
        "Preferred Country",
        enquiry.country
      );

      addField(
        "Academic Status",
        enquiry.academic_status
      );

      addField(
        "Enquiry Status",
        enquiry.status
      );

      /* -------------------------------------
         MESSAGE
      ------------------------------------- */

      doc.moveDown(0.5);

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#111111")
        .text("Message:");

      doc.moveDown(0.5);

      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#333333")
        .text(
          enquiry.message ||
            "No message provided.",
          {
            lineGap: 5,
          }
        );

      /* -------------------------------------
         FOOTER
      ------------------------------------- */

      doc.moveDown(3);

      doc
        .fontSize(9)
        .fillColor("#777777")
        .text(
          "EduGuide Educational Services",
          {
            align: "center",
          }
        );

      doc.text(
        "Tiruppur, Tamil Nadu",
        {
          align: "center",
        }
      );

      doc.end();
    }
  );
}

/* =========================================
   ADMIN — DOWNLOAD PDF
========================================= */

app.get(
  "/api/admin/enquiries/:id/pdf",
  requireAdmin,
  async (req, res) => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid enquiry ID.",
        });
      }

      const result =
        await pool.query(
          `
            SELECT
              id,
              name,
              phone,
              email,
              country,
              academic_status,
              message,
              status,
              created_at,
              updated_at
            FROM enquiries
            WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Enquiry not found.",
        });
      }

      const enquiry =
        result.rows[0];

      const pdfBuffer =
        await createEnquiryPDF(
          enquiry
        );

      const safeName =
        enquiry.name
          .replace(
            /[^a-z0-9]/gi,
            "_"
          )
          .substring(
            0,
            40
          );

      const fileName =
        `EduGuide_Enquiry_${safeName}_${enquiry.id}.pdf`;

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );

      res.setHeader(
        "Content-Length",
        pdfBuffer.length
      );

      return res.send(
        pdfBuffer
      );
    } catch (error) {
      console.error(
        "❌ PDF generation error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to generate PDF.",
      });
    }
  }
);

/* =========================================
   404 HANDLER
========================================= */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "API endpoint not found.",
    });
  }
);

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use(
  (error, req, res, next) => {
    console.error(
      "❌ Server error:",
      error.message
    );

    // CORS errors
    if (
      error.message ===
      "Not allowed by CORS"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "CORS policy blocked this request.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });
  }
);

/* =========================================
   START SERVER
========================================= */

initializeDatabase()
  .then(() => {
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
          "🔐 Admin authentication: READY"
        );

        console.log(
          "📊 Admin enquiry APIs: READY"
        );

        console.log(
          "📄 Admin PDF generation: READY"
        );
      }
    );
  })
  .catch((error) => {
    console.error(
      "❌ Server startup failed:",
      error
    );
  });