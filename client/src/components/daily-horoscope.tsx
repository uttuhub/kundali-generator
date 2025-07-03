import { useState } from "react";
import { Calendar, Star, Sunrise } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const horoscopes = {
  "Aries": "Today brings new opportunities for leadership. Your natural charisma will open doors.",
  "Taurus": "Focus on stability and practical matters. Financial decisions made today will benefit you long-term.",
  "Gemini": "Communication is your superpower today. Express your ideas with confidence.",
  "Cancer": "Trust your intuition in emotional matters. Family connections bring joy and healing.",
  "Leo": "Your creativity shines bright today. Artistic endeavors will bring recognition.",
  "Virgo": "Attention to detail serves you well. Organize your goals for maximum impact.",
  "Libra": "Balance and harmony guide your decisions. Relationships flourish under your diplomatic touch.",
  "Scorpio": "Deep transformation is possible today. Embrace change with courage and wisdom.",
  "Sagittarius": "Adventure calls to you. Expand your horizons through learning and exploration.",
  "Capricorn": "Ambitious goals are within reach. Your persistence will pay off handsomely.",
  "Aquarius": "Innovation and originality set you apart. Your unique perspective is valued.",
  "Pisces": "Spiritual insights guide your path. Trust your dreams and inner wisdom."
};

export default function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState<string>("");

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-2xl font-poppins font-bold text-purple-800 flex items-center">
          <Sunrise className="h-6 w-6 mr-3 text-yellow-500" />
          Daily Horoscope
        </CardTitle>
        <p className="text-purple-600">Get your personalized daily guidance</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Select Your Zodiac Sign
            </label>
            <Select onValueChange={setSelectedSign}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>
                    {sign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSign && (
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center mb-3">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-purple-800">{selectedSign} - {new Date().toLocaleDateString()}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {horoscopes[selectedSign as keyof typeof horoscopes]}
              </p>
              <div className="mt-3 flex items-center text-sm text-purple-600">
                <Calendar className="h-4 w-4 mr-1" />
                Updated daily with cosmic insights
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}