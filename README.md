# Kundali Generator

A production-ready web application for generating personalized Kundali (birth chart) reports with detailed astrological insights.

## Features

- **Interactive Birth Details Form**: Collects name, gender, date/time/place of birth
- **Astrological Calculations**: Real-time calculation of Rashi, Nakshatra, and Lagna
- **Beautiful Results Display**: Comprehensive presentation of astrological data
- **Payment Integration**: Secure ₹1 payment via Razorpay for PDF downloads
- **PDF Report Generation**: Detailed downloadable Kundali reports
- **Database Storage**: PostgreSQL with persistent data storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Neon serverless provider
- **ORM**: Drizzle ORM for type-safe database operations
- **UI**: Tailwind CSS + Radix UI components
- **Payment**: Razorpay integration
- **PDF**: PDFKit for report generation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (DATABASE_URL, payment keys)
4. Push database schema: `npm run db:push`
5. Start development server: `npm run dev`

## API Endpoints

- `POST /api/kundali` - Create new kundali request
- `GET /api/kundali/:id` - Retrieve kundali data
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment
- `GET /api/kundali/:id/pdf` - Download PDF report

## Project Structure

```
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Shared types and schemas
└── components.json   # UI components configuration
```

## Creator

**Created by Your Name**

Built with precision and passion for astrology enthusiasts worldwide.

## License

© 2025 Kundali Generator. All rights reserved.

---

*Your Spiritual Journey Awaits* ✨