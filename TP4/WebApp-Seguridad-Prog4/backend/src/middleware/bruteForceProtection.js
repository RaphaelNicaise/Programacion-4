// Middleware para protección contra brute force
const failedAttempts = new Map();

// Función para calcular delay exponencial
const getDelay = (attempts) => {
  if (attempts === 0) return 0;
  return Math.pow(2, attempts - 1) * 1000; // 0s, 1s, 2s, 4s, 8s...
};

// Función para esperar
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const bruteForceProtection = async (req, res, next) => {
  const userKey = req.ip || 'unknown';
  const attempts = failedAttempts.get(userKey) || { count: 0, timestamp: Date.now() };
  
  // Resetear intentos si han pasado más de 15 minutos
  if (Date.now() - attempts.timestamp > 15 * 60 * 1000) {
    attempts.count = 0;
    attempts.timestamp = Date.now();
    failedAttempts.set(userKey, attempts);
  }
  
  // Requerir CAPTCHA después de 3 intentos fallidos
  if (attempts.count >= 3 && !req.body.captcha) {
    return res.status(400).json({ error: 'Se requiere captcha después de múltiples intentos fallidos' });
  }
  
  // Aplicar delay progresivo
  const delay = getDelay(attempts.count);
  if (delay > 0) {
    await sleep(delay);
  }
  
  // Pasar los intentos al request para que el controller pueda actualizarlos
  req.failedAttempts = attempts;
  req.userKey = userKey;
  
  next();
};

// Función para registrar intento fallido
const recordFailedAttempt = (req) => {
  if (req.userKey && req.failedAttempts) {
    req.failedAttempts.count++;
    req.failedAttempts.timestamp = Date.now();
    failedAttempts.set(req.userKey, req.failedAttempts);
  }
};

// Función para limpiar intentos fallidos
const clearFailedAttempts = (req) => {
  if (req.userKey) {
    failedAttempts.delete(req.userKey);
  }
};

// Función para limpiar todos los intentos (para testing)
const clearAllAttempts = () => {
  failedAttempts.clear();
};

module.exports = {
  bruteForceProtection,
  recordFailedAttempt,
  clearFailedAttempts,
  clearAllAttempts,
  failedAttempts,
  getDelay,
  sleep
};