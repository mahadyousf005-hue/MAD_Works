const db = require('../config/db');

// Get profile + cart items
exports.getProfile = (req, res) => {
  const { user_id } = req.params;
  if (!user_id) return res.status(400).json({ msg: "User ID required" });

  // Get user info
  db.query("SELECT id, email FROM users WHERE id = ?", [user_id], (err, userResult) => {
    if (err) return res.status(500).json({ msg: err });
    if (userResult.length === 0) return res.status(404).json({ msg: "User not found" });

    const user = userResult[0];

    // Get user's cart items
    db.query(
      `SELECT cart.id as cart_id, products.id as product_id, products.name, products.price, products.image, cart.quantity
       FROM cart
       JOIN products ON cart.product_id = products.id
       WHERE cart.user_id = ?`,
      [user_id],
      (err, cartItems) => {
        if (err) return res.status(500).json({ msg: err });

        res.json({ user, cartItems });
      }
    );
  });
};
