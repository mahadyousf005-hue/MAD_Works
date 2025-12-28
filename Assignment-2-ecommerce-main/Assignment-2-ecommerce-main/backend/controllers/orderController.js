const db = require('../config/db');

// Checkout / Create order
exports.checkout = (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ msg: "User ID required" });

  // Get cart items
  db.query(
    `SELECT products.id, products.price, cart.quantity 
     FROM cart 
     JOIN products ON cart.product_id = products.id 
     WHERE cart.user_id = ?`,
    [user_id],
    (err, cartItems) => {
      if (err) return res.status(500).json({ msg: err });
      if (cartItems.length === 0) return res.status(400).json({ msg: "Cart is empty" });

      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Insert order
      db.query("INSERT INTO orders (user_id, total) VALUES (?, ?)", [user_id, total], (err, orderResult) => {
        if (err) return res.status(500).json({ msg: err });

        const order_id = orderResult.insertId;
        const orderItemsValues = cartItems.map(item => [order_id, item.id, item.quantity]);

        db.query("INSERT INTO order_items (order_id, product_id, quantity) VALUES ?", [orderItemsValues], (err) => {
          if (err) return res.status(500).json({ msg: err });

          // Clear cart
          db.query("DELETE FROM cart WHERE user_id = ?", [user_id], (err) => {
            if (err) return res.status(500).json({ msg: err });
            res.json({ msg: "Order placed successfully", order_id });
          });
        });
      });
    }
  );
};
