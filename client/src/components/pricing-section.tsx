import { Check, Crown, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic Kundali",
    price: "₹1",
    period: "one-time",
    description: "Perfect for getting started with astrology",
    features: [
      "Complete birth chart analysis",
      "Rashi, Nakshatra & Lagna details",
      "Downloadable PDF report",
      "Basic personality insights",
      "Email support"
    ],
    popular: false,
    color: "blue"
  },
  {
    name: "Premium Kundali",
    price: "₹199",
    period: "one-time",
    description: "Comprehensive astrological analysis",
    features: [
      "Everything in Basic",
      "Detailed planetary positions",
      "Marriage compatibility analysis",
      "Career guidance predictions",
      "Health & wealth insights",
      "Remedial measures & gemstone suggestions",
      "Priority email support",
      "Lifetime access to report"
    ],
    popular: true,
    color: "purple"
  },
  {
    name: "Pro Astrologer",
    price: "₹499",
    period: "monthly",
    description: "For serious astrology enthusiasts",
    features: [
      "Everything in Premium",
      "Monthly personalized predictions",
      "Live chat consultation (30 min)",
      "Daily horoscope updates",
      "Muhurat recommendations",
      "Yearly forecast report",
      "WhatsApp support",
      "Early access to new features"
    ],
    popular: false,
    color: "gold"
  }
];

export default function PricingSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Choose Your Plan</h3>
          <p className="text-xl text-gray-600">Unlock deeper insights with our comprehensive packages</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-2 border-purple-500 shadow-lg transform scale-105' 
                  : 'border border-gray-200 hover:border-purple-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-medium">
                  <Crown className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-poppins font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="px-6 pb-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {plan.name === 'Basic Kundali' ? (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Get Started
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Choose Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            All plans include secure payment processing and instant delivery
          </p>
          <p className="text-sm text-gray-500 mt-2">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}