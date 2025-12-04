const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const { csrfProtection, validateOrigin } = require('../middleware/csrfProtection');

router.use(cookieParser());

router.use((req, res, next) => {
  const originalSetHeader = res.setHeader;
  res.setHeader = function(name, value) {
    if (name.toLowerCase() === 'set-cookie') {
      if (Array.isArray(value)) {
        value = value.map(cookie => {
          if (cookie.includes('connect.sid') && !cookie.includes('SameSite')) {
            return cookie + '; SameSite=Strict';
          }
          return cookie;
        });
      } else if (typeof value === 'string') {
        if (value.includes('connect.sid') && !value.includes('SameSite')) {
          value = value + '; SameSite=Strict';
        }
      }
    }
    return originalSetHeader.call(this, name, value);
  };
  next();
});

router.post('/ping', vulnerabilityController.ping);

router.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

router.post('/transfer', validateOrigin, csrfProtection, vulnerabilityController.transfer);

router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token validation failed' });
  }
  next(err);
});

router.get('/file', vulnerabilityController.readFile);
router.post('/upload', uploadMiddleware, uploadFile);

module.exports = router;
