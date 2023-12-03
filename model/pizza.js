const { Schema, model } = require('mongoose');

const pizzaSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Pizza type is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Pizza description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Pizza price is required'],
  },
});

const Pizza = model('Pizza', pizzaSchema);


// Create default pizzas

(async () => {
  const defaultPizzas = [
    {
      type: 'Margherita',
      description: 'Classic Margherita Pizza',
      price: 10.99,
    },
    {
      type: 'Pepperoni',
      description: 'Pepperoni Pizza with extra cheese',
      price: 12.99,
    },
  ];

  const promises = defaultPizzas.map(async (pizza) => {
    const existingPizza = await Pizza.findOne({ type: pizza.type });

    if (existingPizza) {
      return Pizza.findOneAndUpdate({ type: pizza.type }, pizza, { new: true });
    } else {
      return Pizza.create(pizza);
    }
  });

  const pizzas = await Promise.all(promises);

  console.log('Default pizzas added successfully');
}).call();


module.exports = {
  Pizza,
};
