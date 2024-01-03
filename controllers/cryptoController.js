import axios from "axios";
import Crypto from "../models/Crypto.js";

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get("https://api.example.com/cryptoprices");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cryptocurrency prices");
  }
};

const getAllCryptos = async (req, res) => {
  try {
    // Fetch cryptocurrency prices
    const prices = await fetchCryptoPrices();

    // Get all cryptocurrencies
    const cryptocurrencies = await Crypto.find();

    res.json({ cryptocurrencies, prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCrypto = async (req, res) => {
  try {
    // Fetch cryptocurrency prices
    const prices = await fetchCryptoPrices();

    // Implement logic to add a cryptocurrency
    const newCrypto = await Crypto.create(req.body);

    res.json({ crypto: newCrypto, prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCrypto = async (req, res) => {
  try {
    // Fetch cryptocurrency prices
    const prices = await fetchCryptoPrices();

    // Implement logic to update a cryptocurrency
    const updatedCrypto = await Crypto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ crypto: updatedCrypto, prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCrypto = async (req, res) => {
  try {
    // Fetch cryptocurrency prices
    const prices = await fetchCryptoPrices();

    // Implement logic to delete a cryptocurrency
    await Crypto.findByIdAndDelete(req.params.id);

    res.json({ message: "Cryptocurrency deleted successfully", prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllCryptos, addCrypto, updateCrypto, deleteCrypto };
