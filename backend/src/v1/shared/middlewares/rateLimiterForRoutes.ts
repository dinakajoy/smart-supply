import rateLimit from 'express-rate-limit';

const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 create account requests per hour
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many access attempt from this IP, please try again after an hour'
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default accountLimiter;
