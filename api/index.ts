import { createServer } from 'http';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();

// Security middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Rate limiting for API endpoints
const rateLimitMap = new Map();
const rateLimit = (maxRequests: number, windowMs: number) => {
  return (req: any, res: any, next: any) => {
    const key = req.ip + req.path;
    const now = Date.now();
    
    if (!rateLimitMap.has(key)) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const limit = rateLimitMap.get(key);
    if (now > limit.resetTime) {
      limit.count = 1;
      limit.resetTime = now + windowMs;
      return next();
    }
    
    if (limit.count >= maxRequests) {
      return res.status(429).json({ 
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((limit.resetTime - now) / 1000)
      });
    }
    
    limit.count++;
    next();
  };
};

app.use('/api', rateLimit(10, 60000));

// Register routes
registerRoutes(app);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;