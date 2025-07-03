import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertKundaliSchema } from "@shared/schema";
import { astrologyService } from "./services/astrology";
import { paymentService } from "./services/payment";
import { pdfService } from "./services/pdf";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create new kundali request
  app.post("/api/kundali", async (req, res) => {
    try {
      // Input validation and sanitization
      const validatedData = insertKundaliSchema.parse(req.body);
      
      // Additional security checks
      if (!validatedData.name || validatedData.name.length > 100) {
        return res.status(400).json({ message: "Invalid name provided" });
      }
      if (!validatedData.placeOfBirth || validatedData.placeOfBirth.length > 200) {
        return res.status(400).json({ message: "Invalid place of birth provided" });
      }
      
      // Sanitize inputs to prevent XSS
      const sanitizedData = {
        ...validatedData,
        name: validatedData.name.trim().replace(/[<>]/g, ''),
        placeOfBirth: validatedData.placeOfBirth.trim().replace(/[<>]/g, ''),
        gender: validatedData.gender.trim().toLowerCase()
      };
      
      // Create kundali request
      const kundaliRequest = await storage.createKundaliRequest(sanitizedData);
      
      // Get astrology data
      const astrologyData = await astrologyService.getAstrologyData(sanitizedData);
      
      // Update kundali request with astrology data
      const updatedKundali = await storage.updateKundaliRequest(kundaliRequest.id, astrologyData);
      
      res.json(updatedKundali);
    } catch (error) {
      console.error('Error creating kundali:', error);
      res.status(500).json({ message: "Failed to generate kundali" });
    }
  });

  // Get kundali by ID
  app.get("/api/kundali/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const kundali = await storage.getKundaliRequest(id);
      
      if (!kundali) {
        return res.status(404).json({ message: "Kundali not found" });
      }
      
      res.json(kundali);
    } catch (error) {
      console.error('Error fetching kundali:', error);
      res.status(500).json({ message: "Failed to fetch kundali" });
    }
  });

  // Create payment order
  app.post("/api/payment/create-order", async (req, res) => {
    try {
      const amount = 100; // ₹1 in paisa
      const order = await paymentService.createOrder(amount);
      
      res.json(order);
    } catch (error) {
      console.error('Error creating payment order:', error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  // Verify payment
  app.post("/api/payment/verify", async (req, res) => {
    try {
      const { orderId, paymentId, signature, kundaliId } = req.body;
      
      const isValid = await paymentService.verifyPayment(orderId, paymentId, signature);
      
      if (isValid) {
        // Update kundali payment status
        await storage.updateKundaliRequest(parseInt(kundaliId), {
          paymentStatus: "completed",
          paymentId: paymentId
        });
        
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Invalid payment signature" });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Download PDF
  app.get("/api/kundali/:id/pdf", async (req, res) => {
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
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="kundali-${kundali.name.replace(/\s+/g, '-')}.pdf"`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
