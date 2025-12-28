const db = require('../config/db');

// Add to cart
exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  if (!user_id || !product_id) return res.status(400).json({ msg: "User ID and Product ID required" });

  // Check if product already in cart
  db.query("SELECT * FROM cart WHERE user_id = ? AND product_id = ?", [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });

    if (result.length > 0) {
      // Update quantity
      const newQty = result[0].quantity + (quantity || 1);
      db.query("UPDATE cart SET quantity = ? WHERE id = ?", [newQty, result[0].id], (err) => {
        if (err) return res.status(500).json({ msg: err });
        res.json({ msg: "Cart updated" });
      });
    } else {
      // Insert new item
      db.query("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity || 1], (err) => {
        if (err) return res.status(500).json({ msg: err });
        res.json({ msg: "Added to cart" });
      });
    }
  });
};

// Remove from cart
exports.removeFromCart = (req, res) => {
  const { cart_id } = req.body;
  if (!cart_id) return res.status(400).json({ msg: "Cart ID required" });

  db.query("DELETE FROM cart WHERE id = ?", [cart_id], (err) => {
    if (err) return res.status(500).json({ msg: err });
    res.json({ msg: "Item removed from cart" });
  });
};

// Get user's cart
exports.getCart = (req, res) => {
  const { user_id } = req.params;
  db.query(
    `SELECT cart.id as cart_id, products.id, products.name, products.price, products.image, cart.quantity 
     FROM cart 
     JOIN products ON cart.product_id = products.id 
     WHERE cart.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ msg: err });
      res.json(results);
    }
  );
};
