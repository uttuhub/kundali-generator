import PDFDocument from 'pdfkit';
import { KundaliRequest } from '@shared/schema';

export class PDFService {
  async generateKundaliPDF(kundaliData: KundaliRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];

        doc.on('data', (buffer) => buffers.push(buffer));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        // Header
        doc.fontSize(24).font('Helvetica-Bold').text('KUNDALI REPORT', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica').text('Your Personalized Astrological Analysis', { align: 'center' });
        doc.moveDown(2);

        // Personal Information Section
        doc.fontSize(16).font('Helvetica-Bold').text('Personal Information', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica');
        doc.text(`Name: ${kundaliData.name}`);
        doc.text(`Gender: ${kundaliData.gender}`);
        doc.text(`Date of Birth: ${this.formatDate(kundaliData.dateOfBirth)}`);
        doc.text(`Time of Birth: ${this.formatTime(kundaliData.timeOfBirth)}`);
        doc.text(`Place of Birth: ${kundaliData.placeOfBirth}`);
        doc.moveDown(2);

        // Astrological Details Section
        doc.fontSize(16).font('Helvetica-Bold').text('Astrological Details', { underline: true });
        doc.moveDown(0.5);

        // Rashi Section
        doc.fontSize(14).font('Helvetica-Bold').text('Rashi (Moon Sign)');
        doc.fontSize(12).font('Helvetica');
        doc.text(`${kundaliData.rashi || 'Not calculated'}`);
        doc.text(`${kundaliData.rashiDescription || 'Description not available'}`);
        doc.moveDown(1);

        // Nakshatra Section
        doc.fontSize(14).font('Helvetica-Bold').text('Nakshatra (Birth Star)');
        doc.fontSize(12).font('Helvetica');
        doc.text(`${kundaliData.nakshatra || 'Not calculated'}`);
        doc.text(`${kundaliData.nakshatraDescription || 'Description not available'}`);
        doc.moveDown(1);

        // Lagna Section
        doc.fontSize(14).font('Helvetica-Bold').text('Lagna (Ascendant)');
        doc.fontSize(12).font('Helvetica');
        doc.text(`${kundaliData.lagna || 'Not calculated'}`);
        doc.text(`${kundaliData.lagnaDescription || 'Description not available'}`);
        doc.moveDown(2);

        // Additional Information
        doc.fontSize(16).font('Helvetica-Bold').text('About Your Kundali', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica');
        doc.text('This Kundali report provides insights into your astrological profile based on your birth details. ' +
                'The positions of celestial bodies at the time of your birth influence various aspects of your life, ' +
                'personality, and destiny.');
        doc.moveDown(1);

        doc.text('• Rashi (Moon Sign): Represents your emotional nature and subconscious mind');
        doc.text('• Nakshatra (Birth Star): Indicates your inherent qualities and life path');
        doc.text('• Lagna (Ascendant): Shows your outer personality and approach to life');
        doc.moveDown(2);

        // Footer
        doc.fontSize(10).font('Helvetica');
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.text('© 2025 Kundali Generator - Your Spiritual Journey Awaits', { align: 'center' });
        doc.text('Created by Your Name | Built with precision for astrology enthusiasts', { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }
}

export const pdfService = new PDFService();
