const { Pizza } = require('../model/pizza'); 
const PizzaController = {

  getAllPizzas: async (req, res) => {
    try {
      const pizzas = await Pizza.find();
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  },
};

module.exports = {
  PizzaController,
};
