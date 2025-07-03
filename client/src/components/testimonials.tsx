import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "The accuracy of my Kundali report was incredible! Every detail matched my personality perfectly. The PDF is beautifully designed and professional.",
    zodiac: "Cancer"
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India", 
    rating: 5,
    text: "I've consulted many astrologers, but this digital Kundali gave me insights I never knew before. The payment process was smooth and secure.",
    zodiac: "Leo"
  },
  {
    name: "Anita Patel",
    location: "Ahmedabad, India",
    rating: 5,
    text: "Amazing accuracy! The compatibility checker helped me understand my relationship better. Highly recommend this to anyone seeking astrological guidance.",
    zodiac: "Virgo"
  },
  {
    name: "Vikram Singh",
    location: "Jaipur, India",
    rating: 5,
    text: "Professional service with authentic calculations. The daily horoscope feature keeps me connected to cosmic energies every day.",
    zodiac: "Scorpio"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">What Our Users Say</h3>
          <p className="text-xl text-gray-600">Thousands trust us for accurate astrological insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-6 w-6 text-purple-500 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-purple-100 pt-4">
                  <p className="font-semibold text-purple-800">{testimonial.name}</p>
                  <p className="text-sm text-purple-600">{testimonial.location}</p>
                  <p className="text-xs text-purple-500 mt-1">{testimonial.zodiac} ⭐</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-purple-600 font-medium">
            Join 50,000+ satisfied users who trust our astrological insights
          </p>
        </div>
      </div>
    </section>
  );
}