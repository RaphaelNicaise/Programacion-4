const csrf = require('csurf');


const csrfProtection = csrf({ 
  cookie: true 
});

const validateOrigin = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000'
  ];
  const origin = req.get('origin') || req.get('referer');
  if (origin) {

    const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed));
    
    if (!isAllowed) {
      return res.status(403).json({ 
        error: 'Origin not allowed' 
      });
    }
  }

  next();
};

module.exports = {
  csrfProtection,
  validateOrigin
};
