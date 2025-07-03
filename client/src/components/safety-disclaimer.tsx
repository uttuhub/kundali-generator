import { AlertTriangle, Shield, Lock, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SafetyDisclaimer() {
  return (
    <section className="py-8 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Shield className="h-5 w-5 mr-2" />
              Safety & Privacy Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important:</strong> This application is for entertainment and educational purposes only. 
                Astrological insights should not replace professional medical, legal, or financial advice.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start space-x-3">
                <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Data Protection</h4>
                  <p className="text-sm text-blue-700">Your personal information is encrypted and never shared with third parties.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Privacy First</h4>
                  <p className="text-sm text-blue-700">We only collect essential data for generating your Kundali report.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Secure Payments</h4>
                  <p className="text-sm text-blue-700">All transactions are processed through secure, encrypted payment gateways.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">How We Protect You:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SSL encryption for all data transmission</li>
                <li>• No storage of payment card information</li>
                <li>• Optional data deletion after report generation</li>
                <li>• Regular security audits and updates</li>
                <li>• Compliance with data protection regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}