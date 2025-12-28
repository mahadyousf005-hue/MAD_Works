const db = require('../config/db');

// Get all products
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(results);
  });
};
