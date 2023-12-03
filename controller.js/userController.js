const { User } = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {

  signup: async (req, res) => {
    try {
      const { name, email, password, address } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ responseMessage: "Email has already registered" });
      }

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
      });

      res
        .status(201)
        .json({ responseMessage: "User created successfully", newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error", error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(401).json({ responseMessage: "Invalid Email" });
      }
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "password does not matched" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        "Pizza_system",
        { expiresIn: "1h" }
      );

      res.status(200).json({ responseMessage: "Login successfully", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log("Error", error);
    }
  },
};

module.exports = {
  userController,
};
