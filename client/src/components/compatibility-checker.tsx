import { useState } from "react";
import { Heart, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const compatibilityData: Record<string, Record<string, { score: number; description: string }>> = {
  "Aries": {
    "Leo": { score: 95, description: "Fiery passion and shared ambition create an unstoppable duo." },
    "Sagittarius": { score: 90, description: "Adventure and excitement fuel this dynamic relationship." },
    "Gemini": { score: 85, description: "Mental stimulation and spontaneity keep things interesting." },
    "Aquarius": { score: 80, description: "Independence and innovation create a unique bond." },
    "Libra": { score: 75, description: "Opposites attract in this balanced partnership." },
    "Virgo": { score: 60, description: "Different approaches but potential for growth." },
    "Cancer": { score: 55, description: "Emotional needs may clash but deep care exists." },
    "Capricorn": { score: 50, description: "Different paces but shared determination." },
    "Scorpio": { score: 45, description: "Intense but potentially challenging dynamics." },
    "Pisces": { score: 40, description: "Different energy levels require understanding." },
    "Taurus": { score: 35, description: "Stubborn personalities may create friction." },
    "Aries": { score: 70, description: "Shared fire but potential for ego clashes." }
  }
  // Additional compatibility data would be here for all signs
};

export default function CompatibilityChecker() {
  const [sign1, setSign1] = useState<string>("");
  const [sign2, setSign2] = useState<string>("");
  const [result, setResult] = useState<{ score: number; description: string } | null>(null);

  const checkCompatibility = () => {
    if (sign1 && sign2) {
      const compatibility = compatibilityData[sign1]?.[sign2] || 
                          compatibilityData[sign2]?.[sign1] || 
                          { score: 60, description: "Every relationship has potential with understanding and effort." };
      setResult(compatibility);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Compatibility";
    return "Needs Understanding";
  };

  return (
    <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
      <CardHeader>
        <CardTitle className="text-2xl font-poppins font-bold text-rose-800 flex items-center">
          <Heart className="h-6 w-6 mr-3 text-red-500" />
          Love Compatibility
        </CardTitle>
        <p className="text-rose-600">Discover your astrological compatibility</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">
                Your Sign
              </label>
              <Select onValueChange={setSign1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sign" />
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

            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2">
                Partner's Sign
              </label>
              <Select onValueChange={setSign2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select partner's sign" />
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
          </div>

          <Button
            onClick={checkCompatibility}
            disabled={!sign1 || !sign2}
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
          >
            <Users className="h-4 w-4 mr-2" />
            Check Compatibility
          </Button>

          {result && (
            <div className="bg-white rounded-lg p-4 border border-rose-200">
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </div>
                <div className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </div>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                {result.description}
              </p>
              <div className="mt-3 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(result.score / 20)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}