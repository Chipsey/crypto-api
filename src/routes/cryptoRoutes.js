import express from "express";
import {
  getAllCryptos,
  addCrypto,
  deleteCrypto,
  getCryptoById,
} from "../controllers/cryptoController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cryptocurrency
 *   description: Cryptocurrency management
 */

/**
 * @swagger
 * /api/v1/crypto:
 *   get:
 *     summary: Get all cryptocurrencies
 *     tags: [Cryptocurrency]
 *     responses:
 *       200:
 *         description: List of cryptocurrencies
 *         content:
 *           application/json:
 *             example:
 *               cryptocurrencies: [
 *                 { _id: "cryptoId1", name: "Bitcoin", symbol: "BTC", price: 50000 },
 *                 { _id: "cryptoId2", name: "Ethereum", symbol: "ETH", price: 3000 }
 *               ]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error fetching cryptocurrencies"
 */

router.get("/", getAllCryptos);

/**
 * @swagger
 * /api/v1/crypto/{id}:
 *   get:
 *     summary: Get cryptocurrency by ID
 *     tags: [Cryptocurrency]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cryptocurrency
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cryptocurrency details
 *         content:
 *           application/json:
 *             example:
 *               crypto: { _id: "cryptoId1", name: "Bitcoin", symbol: "BTC", price: 50000 }
 *       404:
 *         description: Cryptocurrency not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Cryptocurrency not found!"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error fetching cryptocurrency details"
 */

router.get("/:id", getCryptoById);

/**
 * @swagger
 * /api/v1/crypto:
 *   post:
 *     summary: Add a new cryptocurrency
 *     tags: [Cryptocurrency]
 *     requestBody:
 *       description: Cryptocurrency data to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptoName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cryptocurrency added successfully
 *         content:
 *           application/json:
 *             example:
 *               crypto: { _id: "cryptoId", name: "New Crypto", symbol: "NC", price: 100 }
 *       400:
 *         description: Crypto already exists or invalid cryptocurrency name
 *         content:
 *           application/json:
 *             example:
 *               error: "Crypto already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error adding cryptocurrency"
 */

router.post("/", addCrypto);

/**
 * @swagger
 * /api/v1/crypto/{id}:
 *   delete:
 *     summary: Delete a cryptocurrency by ID
 *     tags: [Cryptocurrency]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cryptocurrency
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cryptocurrency deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Cryptocurrency deleted"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Error deleting cryptocurrency"
 */

router.delete("/:id", deleteCrypto);

export default router;
