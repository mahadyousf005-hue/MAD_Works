const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',   // ya localhost
  user: 'shopuser',
  password: 'shop123',
  database: 'shopDB'
});


// Try to connect
db.connect((err) => {
  if (err) {
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error("❌ MySQL Access Denied: Check your username/password in db.js");
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error("❌ MySQL Database not found: Make sure 'shopDB' exists");
    } else {
      console.error("❌ MySQL connection error:", err);
    }
    process.exit(1); // Exit server if DB connection fails
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

module.exports = db;
