import axios from "axios";
import Crypto from "../models/Crypto.js";
import cron from "node-cron";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchCryptoPrices = async (cryptoName) => {
  await wait(1000);
  await wait(1000);
  await wait(1000);
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName}&x_cg_demo_api_key=CG-2RjvCuEB8GnG4rvSuvqnpvZ7`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cryptocurrency prices");
  }
};

const getAllCryptos = async (req, res) => {
  try {
    const cryptocurrencies = await Crypto.find();

    res.status(200).json({ cryptocurrencies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCryptoById = async (req, res) => {
  try {
    const cryptoId = req.params.id;

    const crypto = await Crypto.findById(cryptoId);

    if (!crypto) {
      return res.status(404).json({ error: "CryptoCurrency not found!" });
    }

    res.status(200).json({ crypto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCryptosByIds = async (req, res) => {
  try {
    const cryptoIds = req.body.ids;

    const cryptoPromises = cryptoIds.map(async (cryptoId) => {
      const crypto = await Crypto.findById(cryptoId);
      return crypto;
    });

    const cryptos = await Promise.all(cryptoPromises);

    const validCryptos = cryptos.filter((crypto) => crypto !== null);

    res.status(200).json({ cryptos: validCryptos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCrypto = async (req, res) => {
  try {
    const { cryptoName } = req.body;

    const existingCrypto = await Crypto.findOne({ name: cryptoName });

    if (existingCrypto) {
      return res.status(400).json({ error: "Crypto already exists" });
    }

    const prices = await fetchCryptoPrices(cryptoName);

    if (prices.length === 0) {
      return res.status(400).json({ error: "Invalid cryptocurrency name" });
    }

    const cryptoSymbol = prices[0].image;
    const price = prices[0].current_price;

    const newCrypto = await Crypto.create({
      name: cryptoName,
      symbol: cryptoSymbol,
      price,
    });

    res.status(200).json({ crypto: newCrypto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCrypto = async (req, res) => {
  try {
    // Delete a cryptocurrency
    await Crypto.findByIdAndDelete(req.params.id);

    res.json({ message: "Cryptocurrency deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCryptoPrices = async () => {
  try {
    const cryptos = await Crypto.find();

    for (const crypto of cryptos) {
      const cryptoName = crypto.name;

      try {
        const updatedCryptoDetails = await fetchCryptoPrices(cryptoName);

        if (updatedCryptoDetails.length === 0) {
          console.log(`Check crypto name: ${cryptoName}`);
          continue;
        }

        await Crypto.updateOne(
          { name: cryptoName },
          { $set: { price: updatedCryptoDetails[0].current_price } }
        );

        console.log(
          `Updated price for ${cryptoName}: ${updatedCryptoDetails[0].current_price}`
        );
      } catch (priceError) {
        console.error(
          `Error updating price for ${cryptoName}: ${priceError.message}`
        );
      }
    }

    console.log("Crypto updated successfully.");
  } catch (error) {
    console.error("Error updating crypto:", error.message);
  }
};

cron.schedule("*/1000 * * * * *", updateCryptoPrices);

export {
  getAllCryptos,
  addCrypto,
  deleteCrypto,
  getCryptoById,
  getCryptosByIds,
};
