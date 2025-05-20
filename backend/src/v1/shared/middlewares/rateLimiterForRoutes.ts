import rateLimit from 'express-rate-limit';

const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 requests per hour to a route
  handler: (_req, res) => {
    res.status(429).json({
      status: 'error',
      message:
        'Too many access attempt from this IP. Please wait 1 hour before trying again or contact support',
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default accountLimiter;
