# Kundali Generator

## Overview

This is a full-stack Kundali (birth chart) generator application built with React, Express, and PostgreSQL. The application allows users to input their birth details and generates personalized astrological reports with the option to download comprehensive PDF reports through a payment system.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI components with shadcn/ui
- **Styling**: Tailwind CSS with custom Kundali-themed colors
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Data Storage
- **Database**: PostgreSQL with Neon serverless provider
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Defined in `shared/schema.ts` with Zod validation
- **Tables**: 
  - `users`: User authentication and profiles
  - `kundali_requests`: Birth chart requests and astrological data
- **Storage**: `DatabaseStorage` class with full PostgreSQL integration

### Authentication & Payment
- **Payment Gateway**: Razorpay integration for PDF report purchases
- **Session Management**: PostgreSQL-backed sessions
- **Security**: Environment variable-based API key management

### External Services
- **Astrology API**: Prokerala API for astrological calculations
- **Payment Processing**: Razorpay for secure payment handling
- **PDF Generation**: PDFKit for creating detailed Kundali reports

## Data Flow

1. **User Input**: Users fill out the birth details form (name, gender, date/time/place of birth)
2. **Kundali Generation**: 
   - Form data is validated using Zod schemas
   - Request is stored in database
   - Astrology service calculates Rashi, Nakshatra, and Lagna
   - Database is updated with astrological data
3. **Results Display**: Users view their astrological details on the results page
4. **PDF Purchase**: 
   - Payment order is created via Razorpay
   - Payment verification ensures security
   - PDF is generated and made available for download

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **TypeScript**: Full TypeScript support across client and server
- **Express**: Web framework with middleware support
- **Vite**: Fast build tool and development server

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: For component variant management

### Database and ORM
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL provider
- **PostgreSQL**: Primary database system

### Third-Party Services
- **Prokerala API**: Astrology calculations and birth chart generation
- **Razorpay**: Payment processing and order management
- **PDFKit**: PDF document generation

## Deployment Strategy

### Development
- **Hot Reload**: Vite development server with Express middleware
- **Type Safety**: Shared TypeScript schemas between client and server
- **Environment**: Development-specific configurations and mock data

### Production
- **Build Process**: 
  - Client built with Vite to static assets
  - Server bundled with esbuild for optimal performance
- **Asset Serving**: Express serves static files in production
- **Database**: PostgreSQL connection via environment variables

### Configuration
- **Environment Variables**: Database URL, API keys, payment credentials
- **Path Aliases**: TypeScript path mapping for clean imports
- **Drizzle Config**: Database schema and migration management

## Changelog

```
Changelog:
- July 03, 2025: Initial setup with complete Kundali Generator application
- July 03, 2025: Added PostgreSQL database with Neon provider
- July 03, 2025: Updated payment amount from ₹49 to ₹1 for testing
- July 03, 2025: Fixed CSS import warnings and dialog accessibility issues
- July 03, 2025: Added developer contact info (Utkarsh Mishra, mishrautkarsh277@gmail.com)
- July 03, 2025: Implemented comprehensive security features and safety measures
- July 03, 2025: Added daily horoscope, compatibility checker, testimonials, and pricing sections
- July 03, 2025: Enhanced UI with safety disclaimer and security indicators
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Contact Information: Utkarsh Mishra (mishrautkarsh277@gmail.com)
Security Requirements: Comprehensive safety features required
Payment Amount: ₹1 for testing purposes
```

## Security Features

### Implemented Safety Measures
- **Rate Limiting**: 10 requests per minute per IP for API endpoints
- **Input Sanitization**: XSS prevention and data validation
- **Security Headers**: Complete security header implementation
- **Data Protection**: Encrypted storage and secure transmission
- **Privacy Controls**: User data minimization and deletion options

### Safety Disclaimers
- **Entertainment Purpose**: Clear messaging that astrology is for entertainment only
- **Professional Advice**: Disclaimers about not replacing medical/legal/financial advice
- **Data Usage**: Transparent information about data collection and usage
- **Contact Information**: Direct developer contact for security concerns

### Developer Accountability
- **Contact**: Utkarsh Mishra (mishrautkarsh277@gmail.com)
- **Response Time**: 24-48 hours for security issues
- **Documentation**: Comprehensive security documentation in SECURITY.md