const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const { connectWithRetry } = require('./config/database');
const { initializeFiles } = require('./utils/fileInit');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // necesario para csurf

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(session({
  secret: 'vulnerable-secret',
  resave: false,
  saveUninitialized: true,
  name: 'connect.sid',
  cookie: { 
    secure: false,
    httpOnly: true,
    sameSite: 'strict', 
    path: '/'
  },
 
  rolling: true
}));


app.use((req, res, next) => {
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


app.use('/api', routes);


app.use(notFound);
app.use(errorHandler);


initializeFiles();


setTimeout(connectWithRetry, 5000); 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
  
  console.log('\nRutas disponibles:');
  console.log('- POST /api/login');
  console.log('- POST /api/register');
  console.log('- POST /api/check-username');
  console.log('- GET  /api/products');
  console.log('- POST /api/ping');
  console.log('- POST /api/transfer');
  console.log('- GET  /api/file');
  console.log('- POST /api/upload');
  console.log('- GET  /api/captcha');
  console.log('- POST /api/verify-captcha');
  console.log('- GET  /api/health');
});

module.exports = app;
