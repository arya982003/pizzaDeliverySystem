const express = require('express');
const { userController } = require('../controller.js/userController');
const { PizzaController } = require('../controller.js/pizzaController');
const { OrderController } = require('../controller.js/orderController');
const auth=require('../helper/auth');

const app = express.Router();

// User routes

app.post('/signup', userController.signup);
app.post('/login', userController.login);

// Pizza routes

app.get('/pizzas', PizzaController.getAllPizzas);

// Order routes

app.post('/placeOrder',auth, OrderController.placeOrder);
app.get('/orders',auth, OrderController.getAllOrders);
app.get('/orders/:id',auth, OrderController.getOrderById);
app.put('/updateOrders/:id',auth,OrderController.updateOrder);
app.delete('/cancelOrders/:id',auth, OrderController.cancelOrder);

module.exports=app;
