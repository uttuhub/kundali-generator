import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { UserCircle, Moon, Star, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResultsDisplay from "@/components/results-display";
import PaymentModal from "@/components/payment-modal";
import { formatDate, formatTime } from "@/lib/utils";

export default function Results() {
  const { id } = useParams();
  
  const { data: kundali, isLoading, error } = useQuery({
    queryKey: [`/api/kundali/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    );
  }

  if (error || !kundali) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
              <p className="text-gray-600">Failed to load kundali results</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Results Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Your Kundali Results</h3>
          <p className="text-xl text-gray-600">Based on your birth details</p>
        </div>

        {/* Personal Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins font-semibold text-royal-blue flex items-center">
              <UserCircle className="text-saffron h-8 w-8 mr-3" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold text-gray-900">{kundali.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                <p className="font-semibold text-gray-900">{formatDate(kundali.dateOfBirth)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Time of Birth</p>
                <p className="font-semibold text-gray-900">{formatTime(kundali.timeOfBirth)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Place of Birth</p>
                <p className="font-semibold text-gray-900">{kundali.placeOfBirth}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Gender</p>
                <p className="font-semibold text-gray-900 capitalize">{kundali.gender}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Astrological Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Rashi Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center">
              <Moon className="h-8 w-8 mx-auto mb-3" />
              <CardTitle className="text-xl font-poppins font-bold">Rashi</CardTitle>
              <p className="text-purple-100 text-sm">Moon Sign</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">{kundali.rashi || 'Not available'}</p>
              <p className="text-gray-600">{kundali.rashiDescription || 'Description not available'}</p>
            </CardContent>
          </Card>

          {/* Nakshatra Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-center">
              <Star className="h-8 w-8 mx-auto mb-3" />
              <CardTitle className="text-xl font-poppins font-bold">Nakshatra</CardTitle>
              <p className="text-indigo-100 text-sm">Birth Star</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">{kundali.nakshatra || 'Not available'}</p>
              <p className="text-gray-600">{kundali.nakshatraDescription || 'Description not available'}</p>
            </CardContent>
          </Card>

          {/* Lagna Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-center">
              <Sun className="h-8 w-8 mx-auto mb-3" />
              <CardTitle className="text-xl font-poppins font-bold">Lagna</CardTitle>
              <p className="text-teal-100 text-sm">Ascendant</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">{kundali.lagna || 'Not available'}</p>
              <p className="text-gray-600">{kundali.lagnaDescription || 'Description not available'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Results Display Component */}
        <ResultsDisplay kundali={kundali} />
      </div>

      {/* Payment Modal */}
      <PaymentModal />
    </div>
  );
}
