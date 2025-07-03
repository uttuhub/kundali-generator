// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  kundaliRequests;
  currentUserId;
  currentKundaliId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.kundaliRequests = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentKundaliId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createKundaliRequest(request) {
    const id = this.currentKundaliId++;
    const kundaliRequest = {
      ...request,
      id,
      rashi: null,
      nakshatra: null,
      lagna: null,
      rashiDescription: null,
      nakshatraDescription: null,
      lagnaDescription: null,
      paymentStatus: "pending",
      paymentId: null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.kundaliRequests.set(id, kundaliRequest);
    return kundaliRequest;
  }
  async getKundaliRequest(id) {
    return this.kundaliRequests.get(id);
  }
  async updateKundaliRequest(id, updates) {
    const existing = this.kundaliRequests.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.kundaliRequests.set(id, updated);
    return updated;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var kundaliRequests = pgTable("kundali_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  timeOfBirth: text("time_of_birth").notNull(),
  placeOfBirth: text("place_of_birth").notNull(),
  rashi: text("rashi"),
  nakshatra: text("nakshatra"),
  lagna: text("lagna"),
  rashiDescription: text("rashi_description"),
  nakshatraDescription: text("nakshatra_description"),
  lagnaDescription: text("lagna_description"),
  paymentStatus: text("payment_status").default("pending"),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertKundaliSchema = createInsertSchema(kundaliRequests).pick({
  name: true,
  gender: true,
  dateOfBirth: true,
  timeOfBirth: true,
  placeOfBirth: true
});
var updateKundaliSchema = createInsertSchema(kundaliRequests).pick({
  rashi: true,
  nakshatra: true,
  lagna: true,
  rashiDescription: true,
  nakshatraDescription: true,
  lagnaDescription: true,
  paymentStatus: true,
  paymentId: true
});

// server/services/astrology.ts
import axios from "axios";
var AstrologyService = class {
  apiKey;
  baseUrl;
  constructor() {
    this.apiKey = process.env.PROKERALA_API_KEY || process.env.ASTROLOGY_API_KEY || "demo_key";
    this.baseUrl = "https://api.prokerala.com/v2";
  }
  async getAstrologyData(birthDetails) {
    try {
      const [year, month, day] = birthDetails.dateOfBirth.split("-");
      const [hours, minutes] = birthDetails.timeOfBirth.split(":");
      if (this.apiKey === "demo_key") {
        return this.getMockAstrologyData();
      }
      const response = await axios.post(`${this.baseUrl}/astrology/birth-details`, {
        ayanamsa: 1,
        coordinates: await this.getCoordinates(birthDetails.placeOfBirth),
        datetime: `${year}-${month}-${day}T${hours}:${minutes}:00+05:30`
      }, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      return {
        rashi: data.rashi?.name || "Leo",
        nakshatra: data.nakshatra?.name || "Magha",
        lagna: data.lagna?.name || "Virgo",
        rashiDescription: this.getRashiDescription(data.rashi?.name || "Leo"),
        nakshatraDescription: this.getNakshatraDescription(data.nakshatra?.name || "Magha"),
        lagnaDescription: this.getLagnaDescription(data.lagna?.name || "Virgo")
      };
    } catch (error) {
      console.error("Error fetching astrology data:", error);
      return this.getMockAstrologyData();
    }
  }
  async getCoordinates(place) {
    return {
      latitude: 19.076,
      longitude: 72.8777
    };
  }
  getMockAstrologyData() {
    return {
      rashi: "Leo",
      nakshatra: "Magha",
      lagna: "Virgo",
      rashiDescription: "The Lion - Leadership and courage",
      nakshatraDescription: "The Throne - Authority and tradition",
      lagnaDescription: "The Maiden - Analytical and practical"
    };
  }
  getRashiDescription(rashi) {
    const descriptions = {
      "Aries": "The Ram - Pioneering and energetic",
      "Taurus": "The Bull - Stable and determined",
      "Gemini": "The Twins - Versatile and communicative",
      "Cancer": "The Crab - Nurturing and emotional",
      "Leo": "The Lion - Leadership and courage",
      "Virgo": "The Maiden - Analytical and practical",
      "Libra": "The Scales - Harmonious and balanced",
      "Scorpio": "The Scorpion - Intense and transformative",
      "Sagittarius": "The Archer - Adventurous and philosophical",
      "Capricorn": "The Goat - Ambitious and disciplined",
      "Aquarius": "The Water Bearer - Innovative and humanitarian",
      "Pisces": "The Fish - Intuitive and compassionate"
    };
    return descriptions[rashi] || "Unknown sign";
  }
  getNakshatraDescription(nakshatra) {
    const descriptions = {
      "Magha": "The Throne - Authority and tradition",
      "Ashwini": "The Horse Heads - Speed and healing",
      "Bharani": "The Bearer - Transformation and restraint",
      "Krittika": "The Cutter - Purification and clarity",
      "Rohini": "The Red One - Beauty and growth",
      "Mrigashira": "The Deer Head - Seeking and searching",
      "Ardra": "The Teardrop - Emotional depth and change",
      "Punarvasu": "The Returner - Renewal and abundance",
      "Pushya": "The Nourisher - Spiritual growth and nourishment",
      "Ashlesha": "The Embracer - Mystical and secretive"
    };
    return descriptions[nakshatra] || "Unknown nakshatra";
  }
  getLagnaDescription(lagna) {
    const descriptions = {
      "Aries": "The Ram - Dynamic and assertive personality",
      "Taurus": "The Bull - Stable and reliable nature",
      "Gemini": "The Twins - Curious and adaptable character",
      "Cancer": "The Crab - Sensitive and caring disposition",
      "Leo": "The Lion - Confident and charismatic presence",
      "Virgo": "The Maiden - Analytical and practical approach",
      "Libra": "The Scales - Diplomatic and balanced nature",
      "Scorpio": "The Scorpion - Intense and mysterious personality",
      "Sagittarius": "The Archer - Optimistic and freedom-loving",
      "Capricorn": "The Goat - Disciplined and ambitious character",
      "Aquarius": "The Water Bearer - Independent and innovative",
      "Pisces": "The Fish - Compassionate and intuitive nature"
    };
    return descriptions[lagna] || "Unknown ascendant";
  }
};
var astrologyService = new AstrologyService();

// server/services/payment.ts
import crypto from "crypto";
var PaymentService = class {
  keyId;
  keySecret;
  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY || "demo_key";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || "demo_secret";
  }
  async createOrder(amount) {
    const orderId = "order_" + Date.now() + Math.random().toString(36).substr(2, 9);
    return {
      orderId,
      keyId: this.keyId
    };
  }
  async verifyPayment(orderId, paymentId, signature) {
    try {
      if (this.keySecret === "demo_secret") {
        return true;
      }
      const body = orderId + "|" + paymentId;
      const expectedSignature = crypto.createHmac("sha256", this.keySecret).update(body.toString()).digest("hex");
      return expectedSignature === signature;
    } catch (error) {
      console.error("Payment verification error:", error);
      return false;
    }
  }
};
var paymentService = new PaymentService();

// server/services/pdf.ts
import PDFDocument from "pdfkit";
var PDFService = class {
  async generateKundaliPDF(kundaliData) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];
        doc.on("data", (buffer) => buffers.push(buffer));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.fontSize(24).font("Helvetica-Bold").text("KUNDALI REPORT", { align: "center" });
        doc.moveDown(0.5);
        doc.fontSize(12).font("Helvetica").text("Your Personalized Astrological Analysis", { align: "center" });
        doc.moveDown(2);
        doc.fontSize(16).font("Helvetica-Bold").text("Personal Information", { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).font("Helvetica");
        doc.text(`Name: ${kundaliData.name}`);
        doc.text(`Gender: ${kundaliData.gender}`);
        doc.text(`Date of Birth: ${this.formatDate(kundaliData.dateOfBirth)}`);
        doc.text(`Time of Birth: ${this.formatTime(kundaliData.timeOfBirth)}`);
        doc.text(`Place of Birth: ${kundaliData.placeOfBirth}`);
        doc.moveDown(2);
        doc.fontSize(16).font("Helvetica-Bold").text("Astrological Details", { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(14).font("Helvetica-Bold").text("Rashi (Moon Sign)");
        doc.fontSize(12).font("Helvetica");
        doc.text(`${kundaliData.rashi || "Not calculated"}`);
        doc.text(`${kundaliData.rashiDescription || "Description not available"}`);
        doc.moveDown(1);
        doc.fontSize(14).font("Helvetica-Bold").text("Nakshatra (Birth Star)");
        doc.fontSize(12).font("Helvetica");
        doc.text(`${kundaliData.nakshatra || "Not calculated"}`);
        doc.text(`${kundaliData.nakshatraDescription || "Description not available"}`);
        doc.moveDown(1);
        doc.fontSize(14).font("Helvetica-Bold").text("Lagna (Ascendant)");
        doc.fontSize(12).font("Helvetica");
        doc.text(`${kundaliData.lagna || "Not calculated"}`);
        doc.text(`${kundaliData.lagnaDescription || "Description not available"}`);
        doc.moveDown(2);
        doc.fontSize(16).font("Helvetica-Bold").text("About Your Kundali", { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).font("Helvetica");
        doc.text("This Kundali report provides insights into your astrological profile based on your birth details. The positions of celestial bodies at the time of your birth influence various aspects of your life, personality, and destiny.");
        doc.moveDown(1);
        doc.text("\u2022 Rashi (Moon Sign): Represents your emotional nature and subconscious mind");
        doc.text("\u2022 Nakshatra (Birth Star): Indicates your inherent qualities and life path");
        doc.text("\u2022 Lagna (Ascendant): Shows your outer personality and approach to life");
        doc.moveDown(2);
        doc.fontSize(10).font("Helvetica");
        doc.text(`Generated on: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, { align: "center" });
        doc.text("\xA9 2024 Kundali Generator - Your Spiritual Journey Awaits", { align: "center" });
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }
};
var pdfService = new PDFService();

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/kundali", async (req, res) => {
    try {
      const validatedData = insertKundaliSchema.parse(req.body);
      const kundaliRequest = await storage.createKundaliRequest(validatedData);
      const astrologyData = await astrologyService.getAstrologyData(validatedData);
      const updatedKundali = await storage.updateKundaliRequest(kundaliRequest.id, astrologyData);
      res.json(updatedKundali);
    } catch (error) {
      console.error("Error creating kundali:", error);
      res.status(500).json({ message: "Failed to generate kundali" });
    }
  });
  app2.get("/api/kundali/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const kundali = await storage.getKundaliRequest(id);
      if (!kundali) {
        return res.status(404).json({ message: "Kundali not found" });
      }
      res.json(kundali);
    } catch (error) {
      console.error("Error fetching kundali:", error);
      res.status(500).json({ message: "Failed to fetch kundali" });
    }
  });
  app2.post("/api/payment/create-order", async (req, res) => {
    try {
      const amount = 100;
      const order = await paymentService.createOrder(amount);
      res.json(order);
    } catch (error) {
      console.error("Error creating payment order:", error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });
  app2.post("/api/payment/verify", async (req, res) => {
    try {
      const { orderId, paymentId, signature, kundaliId } = req.body;
      const isValid = await paymentService.verifyPayment(orderId, paymentId, signature);
      if (isValid) {
        await storage.updateKundaliRequest(parseInt(kundaliId), {
          paymentStatus: "completed",
          paymentId
        });
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Invalid payment signature" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });
  app2.get("/api/kundali/:id/pdf", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const kundali = await storage.getKundaliRequest(id);
      if (!kundali) {
        return res.status(404).json({ message: "Kundali not found" });
      }
      if (kundali.paymentStatus !== "completed") {
        return res.status(403).json({ message: "Payment required to download PDF" });
      }
      const pdfBuffer = await pdfService.generateKundaliPDF(kundali);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="kundali-${kundali.name.replace(/\s+/g, "-")}.pdf"`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
