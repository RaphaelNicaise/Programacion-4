const { db } = require('../config/database');

// VULNERABLE: SQL Injection
const getProducts = (req, res) => {
  const { category, search } = req.query;
  
  // VULNERABLE: Concatenación directa de strings en SQL
  let query = 'SELECT * FROM products WHERE 1=1';

  try {
    if (category.includes(';') || category.includes('--') || category.includes("'")) {
      return res.status(200).json([])
    }
    if (search.includes(';') || search.includes('--') || search.includes("'")) {
      return res.status(200).json([])
    }
  } catch (error) {
    console.log(`Error: ${error}`)
  }

  if (category) {
    query += ` AND category = '${category}'`;
  }
  
  if (search) {
    query += ` AND name LIKE '%${search}%'`;
  }
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

module.exports = {
  getProducts
};
