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
        expiresIn: "24h",
      }
    );

    res.status(200).json({ user: newUser, token });
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

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error("Error: JWT secret key is missing.");
      process.exit(1);
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey,
      { expiresIn: "24h" }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFavoriteCrypto = async (req, res) => {
  const { userId } = req.params;
  const { cryptoId } = req.body;

  try {
    // Check if the user is signed in
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the authenticated user is the owner of the resource
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Check if the crypto is already in favorites
    if (user.favoriteCryptos.includes(cryptoId)) {
      return res.status(400).json({ message: "Crypto already in favorites" });
    }

    // Add the crypto to favorites
    user.favoriteCryptos.push(cryptoId);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Crypto added to favorites", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFavoriteCrypto = async (req, res) => {
  const { userId } = req.params;
  const { cryptoId } = req.body;

  try {
    // Check if the user is signed in
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the authenticated user is the owner of the resource
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Check if the crypto is in favorites
    const cryptoIndex = user.favoriteCryptos.indexOf(cryptoId);

    if (cryptoIndex === -1) {
      return res.status(404).json({ message: "Crypto not found in favorites" });
    }

    // Remove the crypto from favorites
    user.favoriteCryptos.splice(cryptoIndex, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Crypto removed from favorites", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavouriteCryptos = async (req, res) => {
  const { userId } = req.params;

  // console.log(userId);

  try {
    // Check if the user is signed in
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the authenticated user is the owner of the resource
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ cryptos: user.favoriteCryptos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  signup,
  signin,
  addFavoriteCrypto,
  deleteFavoriteCrypto,
  getFavouriteCryptos,
};
