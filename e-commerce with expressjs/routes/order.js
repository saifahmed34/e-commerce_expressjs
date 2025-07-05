const express = require('express');
const Orders = require('../models/Order');
const OrderItem = require('../models/Orderitem');

const router = express.Router();

// ✅ GET all orders
router.get('/', async (req, res) => {
  try {
    const orderList = await Orders.find()
      .populate('OrderItem')
      .populate('user');
    res.json(orderList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST a new order
router.post('/', async (req, res) => {
  try {
    const orderItemIds = await Promise.all(
      req.body.orderItem.map(async (item) => {
        let newOrderItem = new OrderItem({
          quantity: item.quantity,
          product: item.product,
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    let order = new Orders({
      OrderItem: orderItemIds,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      status: req.body.status || 'Pending',
      totalPrice: req.body.totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) return res.status(400).send('The order could not be created');

    res.status(201).send(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ PUT: Update order status or fields
router.put('/:id', async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
      },
      { new: true }
    );

    if (!order) return res.status(404).send('Order not found');

    res.send(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE: Remove an order and its order items
router.delete('/:id', async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) return res.status(404).send('Order not found');

    // delete all related order items
    await Promise.all(order.OrderItem.map(async (id) => await OrderItem.findByIdAndDelete(id)));

    await order.deleteOne();

    res.send({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
