import crypto from 'crypto';

export interface PaymentData {
  amount: number;
  currency: string;
  orderId: string;
  paymentId?: string;
  signature?: string;
}

export class PaymentService {
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY || "demo_key";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || "demo_secret";
  }

  async createOrder(amount: number): Promise<{ orderId: string; keyId: string }> {
    // For demo purposes, generate a mock order
    const orderId = 'order_' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    return {
      orderId,
      keyId: this.keyId
    };
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
    try {
      // For demo purposes, always return true
      if (this.keySecret === "demo_secret") {
        return true;
      }

      // Verify signature using Razorpay's method
      const body = orderId + "|" + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', this.keySecret)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === signature;
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    }
  }
}

export const paymentService = new PaymentService();
