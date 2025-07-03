import { useState } from "react";
import { useLocation } from "wouter";
import { Star, Award, Download, Shield, MoonStar } from "lucide-react";
import KundaliForm from "@/components/kundali-form";
import LoadingModal from "@/components/loading-modal";
import DailyHoroscope from "@/components/daily-horoscope";
import CompatibilityChecker from "@/components/compatibility-checker";
import Testimonials from "@/components/testimonials";
import PricingSection from "@/components/pricing-section";
import SafetyDisclaimer from "@/components/safety-disclaimer";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/kundali', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate kundali');
      }

      const result = await response.json();
      setLocation(`/results/${result.id}`);
    } catch (error) {
      console.error('Error generating kundali:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <MoonStar className="text-saffron h-8 w-8 mr-3" />
              <h1 className="text-2xl font-poppins font-bold text-gray-900">Kundali Generator</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-gray-600 hover:text-saffron font-medium transition-colors">Home</a>
              <a href="#about" className="text-gray-600 hover:text-saffron font-medium transition-colors">About</a>
              <a href="#services" className="text-gray-600 hover:text-saffron font-medium transition-colors">Services</a>
              <a href="#contact" className="text-gray-600 hover:text-saffron font-medium transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="gradient-saffron text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
              Discover Your Cosmic Blueprint
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
              Generate your personalized Kundali with detailed astrological insights
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <Award className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Accurate Predictions</p>
              </div>
              <div className="text-center">
                <Download className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">PDF Download</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="gradient-royal-blue text-white p-8 text-center">
              <h3 className="text-3xl font-poppins font-bold mb-2">Create Your Kundali</h3>
              <p className="text-blue-100">Fill in your birth details to generate your personalized horoscope</p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <KundaliForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">About KundaliGuru</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted digital astrologer powered by authentic Vedic calculations and modern technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We believe that everyone deserves access to accurate astrological insights. Our platform combines 
                traditional Vedic astrology wisdom with cutting-edge technology to provide personalized, 
                authentic birth chart analysis that was once only available to select few.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-saffron mt-1 mr-3" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Authentic Calculations</h5>
                    <p className="text-gray-600">Using proven Vedic astrology methods and precise astronomical data</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-saffron mt-1 mr-3" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Professional Quality</h5>
                    <p className="text-gray-600">Detailed reports comparable to traditional astrologer consultations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-saffron mt-1 mr-3" />
                  <div>
                    <h5 className="font-semibold text-gray-900">Privacy First</h5>
                    <p className="text-gray-600">Your personal information is protected with enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-orange-50 p-8 rounded-lg">
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-saffron rounded-full mr-3"></span>
                  Instant generation of detailed Kundali reports
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-saffron rounded-full mr-3"></span>
                  Integration with Prokerala Astrology API
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-saffron rounded-full mr-3"></span>
                  Secure payment processing via Razorpay
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-saffron rounded-full mr-3"></span>
                  Professional PDF reports for download
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-saffron rounded-full mr-3"></span>
                  24/7 availability and instant results
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-saffron rounded-full mr-3"></span>
                  Developed by experienced astrology enthusiast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-xl text-gray-600">Comprehensive astrological solutions for modern seekers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <MoonStar className="h-12 w-12 text-saffron mx-auto mb-3" />
                <h4 className="text-xl font-semibold text-gray-900">Complete Kundali Analysis</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Detailed birth chart calculation</li>
                <li>• Rashi (Zodiac sign) analysis</li>
                <li>• Nakshatra (Star constellation) insights</li>
                <li>• Lagna (Ascendant) interpretation</li>
                <li>• Planetary positions and aspects</li>
                <li>• Professional PDF report</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <Star className="h-12 w-12 text-saffron mx-auto mb-3" />
                <h4 className="text-xl font-semibold text-gray-900">Daily Horoscope</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Personalized daily predictions</li>
                <li>• All 12 zodiac signs covered</li>
                <li>• Love, career, and health insights</li>
                <li>• Lucky numbers and colors</li>
                <li>• Cosmic energy guidance</li>
                <li>• Updated fresh every day</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <Award className="h-12 w-12 text-saffron mx-auto mb-3" />
                <h4 className="text-xl font-semibold text-gray-900">Compatibility Analysis</h4>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• Love compatibility checker</li>
                <li>• Relationship insights and guidance</li>
                <li>• Compatibility percentage scoring</li>
                <li>• Detailed compatibility descriptions</li>
                <li>• Marriage compatibility analysis</li>
                <li>• Partner understanding tips</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All services are designed for entertainment and educational purposes</p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>Authentic Calculations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Explore More Features</h3>
            <p className="text-xl text-gray-600">Discover additional astrological insights and tools</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DailyHoroscope />
            <CompatibilityChecker />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-xl text-gray-600">We're here to help with your astrological journey</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h4>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-saffron/10 p-3 rounded-lg mr-4">
                    <Star className="h-6 w-6 text-saffron" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Developer</h5>
                    <p className="text-gray-600">Utkarsh Mishra</p>
                    <p className="text-sm text-gray-500">Astrology Enthusiast & Software Developer</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-saffron/10 p-3 rounded-lg mr-4">
                    <Award className="h-6 w-6 text-saffron" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Email Support</h5>
                    <a href="mailto:mishrautkarsh277@gmail.com" className="text-saffron hover:text-orange-600 transition-colors">
                      mishrautkarsh277@gmail.com
                    </a>
                    <p className="text-sm text-gray-500">Response time: 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-saffron/10 p-3 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-saffron" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Security Issues</h5>
                    <p className="text-gray-600">For urgent security matters:</p>
                    <p className="text-sm text-gray-500">Subject: "SECURITY ALERT"</p>
                    <p className="text-sm text-gray-500">Response: Within 12 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Business Hours</h5>
                <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
                <p className="text-gray-600 text-sm">Saturday - Sunday: 10:00 AM - 4:00 PM (IST)</p>
                <p className="text-xs text-gray-500 mt-2">Emergency support available 24/7</p>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h5 className="font-semibold text-gray-900 mb-2">How accurate are the Kundali calculations?</h5>
                  <p className="text-gray-600 text-sm">We use the Prokerala Astrology API, which follows authentic Vedic astrology principles and precise astronomical calculations for maximum accuracy.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h5 className="font-semibold text-gray-900 mb-2">Is my personal information safe?</h5>
                  <p className="text-gray-600 text-sm">Yes, we use enterprise-grade security with SSL encryption. Your data is never shared with third parties and you can request deletion anytime.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h5 className="font-semibold text-gray-900 mb-2">What if I'm not satisfied with my report?</h5>
                  <p className="text-gray-600 text-sm">We offer a 30-day satisfaction guarantee. Contact us if you have any concerns about your Kundali report quality.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
                <h5 className="font-semibold mb-2">Need Immediate Help?</h5>
                <p className="text-sm mb-4">For urgent questions or technical issues, email us directly:</p>
                <a href="mailto:mishrautkarsh277@gmail.com" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Disclaimer */}
      <SafetyDisclaimer />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MoonStar className="text-saffron h-6 w-6 mr-2" />
                <h3 className="text-xl font-poppins font-bold">Kundali Generator</h3>
              </div>
              <p className="text-gray-400">Your trusted partner in discovering cosmic insights and spiritual guidance.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Kundali Generation</a></li>
                <li><a href="#" className="hover:text-white">Horoscope Reading</a></li>
                <li><a href="#" className="hover:text-white">Birth Chart Analysis</a></li>
                <li><a href="#" className="hover:text-white">Astrological Guidance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact & Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <strong className="text-white">Developer:</strong><br />
                  <span className="text-saffron">Utkarsh Mishra</span>
                </li>
                <li>
                  <strong className="text-white">Email:</strong><br />
                  <a href="mailto:mishrautkarsh277@gmail.com" className="hover:text-saffron">
                    mishrautkarsh277@gmail.com
                  </a>
                </li>
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-xl">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-xl">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-xl">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C23.988 5.367 18.621.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.71 13.746 3.71 12.449s.489-2.448 1.297-3.323C5.804 8.198 6.953 7.71 8.25 7.71s2.448.489 3.323 1.297c.897.897 1.297 2.046 1.297 3.343s-.489 2.448-1.297 3.323c-.875.808-2.026 1.315-3.124 1.315z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400">&copy; 2025 Kundali Generator. All rights reserved.</p>
                <p className="mt-2 text-sm">Created by <span className="text-saffron font-medium">Utkarsh Mishra</span> | Built with ❤️ for astrology enthusiasts</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>Trusted Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LoadingModal isOpen={isLoading} />
    </div>
  );
}
