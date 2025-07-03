import { useState } from "react";
import { FileText, Download, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { downloadPDF } from "@/lib/utils";
import type { KundaliRequest } from "@shared/schema";

interface ResultsDisplayProps {
  kundali: KundaliRequest;
}

export default function ResultsDisplay({ kundali }: ResultsDisplayProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Create payment order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: orderData.keyId,
        amount: 100, // ₹1 in paisa
        currency: 'INR',
        order_id: orderData.orderId,
        name: 'Kundali Generator',
        description: 'Detailed Kundali PDF Report',
        theme: {
          color: '#FF6B35'
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                kundaliId: kundali.id,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            toast({
              title: "Payment Successful!",
              description: "You can now download your Kundali PDF report.",
            });

            // Reload page to update payment status
            window.location.reload();
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: "Payment Error",
              description: "Payment verification failed. Please try again.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
            setIsPaymentModalOpen(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/kundali/${kundali.id}/pdf`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const filename = `kundali-${kundali.name.replace(/\s+/g, '-')}.pdf`;
      
      downloadPDF(url, filename);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: "Your Kundali PDF is being downloaded.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Add Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      
      {/* PDF Download Section */}
      <Card className="gradient-gold text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-poppins font-bold flex items-center justify-center">
            <FileText className="h-8 w-8 mr-3" />
            Get Your Complete Kundali Report
          </CardTitle>
          <p className="text-yellow-100 text-lg">
            Download a detailed PDF report with comprehensive astrological analysis
          </p>
        </CardHeader>
        <CardContent className="text-center">
          {kundali.paymentStatus === "completed" ? (
            <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-green-600 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Payment Completed Successfully!</p>
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF Report
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Secure Payment Required</p>
                <div className="text-3xl font-bold text-gray-900 mb-4">₹1</div>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {isProcessingPayment ? 'Processing...' : 'Pay Now with Razorpay'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
