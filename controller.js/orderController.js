const { User} = require('../model/user');
const {Order}=require('../model/order');
const {Pizza}=require('../model/pizza');

const OrderController = {

  placeOrder: async (req, res) => {
    try {
      const {pizzaId, quantity, address } = req.body;

      const user = await User.findById({ _id: req.userId });
      const pizza = await Pizza.findById(pizzaId);

        if (!user || !pizza) {
            return res.status(404).json({ error: 'User or pizza not found' });
          }

      const totalPrice = pizza.price * quantity;

      const newOrder = await Order.create({
        user: user._id,
        pizza: pizzaId,
        quantity,
        address,
        status: 'PLACED',
        totalPrice,
      });

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  },

  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId) .populate({
        path: 'user',
        select: '_id name email address', 
      }).populate('pizza');
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const { type, quantity, address } = req.body;
  
      const updatedPizza = await Pizza.findOne({ type });
  
      if (!updatedPizza) {
        return res.status(404).json({ error: 'Pizza type not found' });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        {
          $set: {
            pizza: updatedPizza._id,
            quantity,
            address,
          },
        },
        { new: true }
      ).populate('pizza'); 
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  cancelOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const cancelledOrder = await Order.findByIdAndUpdate(orderId, { status: 'CANCELLED' }, { new: true });
      res.status(200).json(cancelledOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = {
  OrderController,
};
