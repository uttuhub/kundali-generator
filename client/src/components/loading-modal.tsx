import { Loader2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface LoadingModalProps {
  isOpen: boolean;
}

export default function LoadingModal({ isOpen }: LoadingModalProps) {
  return (
    <Dialog open={isOpen} modal>
      <DialogContent className="sm:max-w-sm border-0 shadow-2xl">
        <DialogTitle className="sr-only">Generating Kundali</DialogTitle>
        <DialogDescription className="sr-only">
          Please wait while we calculate your astrological details based on your birth information.
        </DialogDescription>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto mb-4">
            <div className="sr-only">Loading...</div>
          </div>
          <h4 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
            Generating Your Kundali
          </h4>
          <p className="text-gray-600">
            Please wait while we calculate your astrological details...
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            <Star className="h-4 w-4 text-saffron animate-pulse" />
            <Star className="h-4 w-4 text-saffron animate-pulse" style={{ animationDelay: '0.2s' }} />
            <Star className="h-4 w-4 text-saffron animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
