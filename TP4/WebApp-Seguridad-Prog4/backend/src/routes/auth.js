const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');
const { bruteForceProtection } = require('../middleware/bruteForceProtection');

// Rate limiter para prevenir brute force (singleton)
let loginLimiter;
if (!global.loginRateLimiter) {
  global.loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 intentos por IP
    message: { error: 'Demasiados intentos de login. Por favor intente más tarde.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: true, // No contar peticiones que fallan (400, 401, etc)
  });
}
loginLimiter = global.loginRateLimiter;

// Rutas de autenticación
router.post('/login', bruteForceProtection, loginLimiter, authController.login);
router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', authController.checkUsername);

module.exports = router;