import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

//User signup
const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error("Error: JWT secret key is missing.");
      process.exit(1);
    }

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User signin
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials!" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { signup, signin };
