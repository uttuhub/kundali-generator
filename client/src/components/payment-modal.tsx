import { useState } from "react";
import { CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onProceed?: () => void;
}

export default function PaymentModal({ isOpen = false, onClose, onProceed }: PaymentModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleProceed = () => {
    setIsVisible(false);
    onProceed?.();
  };

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h4 className="text-2xl font-poppins font-semibold text-gray-900 mb-2">Secure Payment</h4>
            <p className="text-gray-600 font-normal">Complete your payment to download the PDF report</p>
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Kundali PDF Report</span>
            <span className="font-semibold text-gray-900">₹1</span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            className="flex-1 bg-green-600 text-white hover:bg-green-700"
          >
            Proceed to Pay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
