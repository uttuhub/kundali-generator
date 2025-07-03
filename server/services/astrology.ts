import axios from 'axios';

export interface AstrologyData {
  rashi: string;
  nakshatra: string;
  lagna: string;
  rashiDescription: string;
  nakshatraDescription: string;
  lagnaDescription: string;
}

export interface BirthDetails {
  name: string;
  gender: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export class AstrologyService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.PROKERALA_API_KEY || process.env.ASTROLOGY_API_KEY || "demo_key";
    this.baseUrl = "https://api.prokerala.com/v2";
  }

  async getAstrologyData(birthDetails: BirthDetails): Promise<AstrologyData> {
    try {
      // Parse birth details
      const [year, month, day] = birthDetails.dateOfBirth.split('-');
      const [hours, minutes] = birthDetails.timeOfBirth.split(':');
      
      // For demo purposes, if using demo key, return mock data
      if (this.apiKey === "demo_key") {
        return this.getMockAstrologyData();
      }

      // Make API call to Prokerala
      const response = await axios.post(`${this.baseUrl}/astrology/birth-details`, {
        ayanamsa: 1,
        coordinates: await this.getCoordinates(birthDetails.placeOfBirth),
        datetime: `${year}-${month}-${day}T${hours}:${minutes}:00+05:30`,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      
      return {
        rashi: data.rashi?.name || "Leo",
        nakshatra: data.nakshatra?.name || "Magha",
        lagna: data.lagna?.name || "Virgo",
        rashiDescription: this.getRashiDescription(data.rashi?.name || "Leo"),
        nakshatraDescription: this.getNakshatraDescription(data.nakshatra?.name || "Magha"),
        lagnaDescription: this.getLagnaDescription(data.lagna?.name || "Virgo"),
      };
    } catch (error) {
      console.error('Error fetching astrology data:', error);
      // Return mock data on error
      return this.getMockAstrologyData();
    }
  }

  private async getCoordinates(place: string): Promise<{ latitude: number; longitude: number }> {
    // For demo purposes, return Mumbai coordinates
    return {
      latitude: 19.0760,
      longitude: 72.8777
    };
  }

  private getMockAstrologyData(): AstrologyData {
    return {
      rashi: "Leo",
      nakshatra: "Magha",
      lagna: "Virgo",
      rashiDescription: "The Lion - Leadership and courage",
      nakshatraDescription: "The Throne - Authority and tradition",
      lagnaDescription: "The Maiden - Analytical and practical",
    };
  }

  private getRashiDescription(rashi: string): string {
    const descriptions: Record<string, string> = {
      "Aries": "The Ram - Pioneering and energetic",
      "Taurus": "The Bull - Stable and determined",
      "Gemini": "The Twins - Versatile and communicative",
      "Cancer": "The Crab - Nurturing and emotional",
      "Leo": "The Lion - Leadership and courage",
      "Virgo": "The Maiden - Analytical and practical",
      "Libra": "The Scales - Harmonious and balanced",
      "Scorpio": "The Scorpion - Intense and transformative",
      "Sagittarius": "The Archer - Adventurous and philosophical",
      "Capricorn": "The Goat - Ambitious and disciplined",
      "Aquarius": "The Water Bearer - Innovative and humanitarian",
      "Pisces": "The Fish - Intuitive and compassionate"
    };
    return descriptions[rashi] || "Unknown sign";
  }

  private getNakshatraDescription(nakshatra: string): string {
    const descriptions: Record<string, string> = {
      "Magha": "The Throne - Authority and tradition",
      "Ashwini": "The Horse Heads - Speed and healing",
      "Bharani": "The Bearer - Transformation and restraint",
      "Krittika": "The Cutter - Purification and clarity",
      "Rohini": "The Red One - Beauty and growth",
      "Mrigashira": "The Deer Head - Seeking and searching",
      "Ardra": "The Teardrop - Emotional depth and change",
      "Punarvasu": "The Returner - Renewal and abundance",
      "Pushya": "The Nourisher - Spiritual growth and nourishment",
      "Ashlesha": "The Embracer - Mystical and secretive"
    };
    return descriptions[nakshatra] || "Unknown nakshatra";
  }

  private getLagnaDescription(lagna: string): string {
    const descriptions: Record<string, string> = {
      "Aries": "The Ram - Dynamic and assertive personality",
      "Taurus": "The Bull - Stable and reliable nature",
      "Gemini": "The Twins - Curious and adaptable character",
      "Cancer": "The Crab - Sensitive and caring disposition",
      "Leo": "The Lion - Confident and charismatic presence",
      "Virgo": "The Maiden - Analytical and practical approach",
      "Libra": "The Scales - Diplomatic and balanced nature",
      "Scorpio": "The Scorpion - Intense and mysterious personality",
      "Sagittarius": "The Archer - Optimistic and freedom-loving",
      "Capricorn": "The Goat - Disciplined and ambitious character",
      "Aquarius": "The Water Bearer - Independent and innovative",
      "Pisces": "The Fish - Compassionate and intuitive nature"
    };
    return descriptions[lagna] || "Unknown ascendant";
  }
}

export const astrologyService = new AstrologyService();
