import express from "express";
import {
  signup,
  signin,
  addFavoriteCrypto,
  deleteFavoriteCrypto,
  getFavouriteCryptos,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and favorite crypto management
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: "userId"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *               token: "jsonwebtoken"
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             example:
 *               message: "User already exists!"
 */

router.post("/signup", signup);

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User sign-in data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: "userId"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *               token: "jsonwebtoken"
 *       404:
 *         description: User doesn't exist
 *         content:
 *           application/json:
 *             example:
 *               message: "User doesn't exist!"
 *       400:
 *         description: Invalid Credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid Credentials!"
 */

router.post("/signin", signin);

/**
 * @swagger
 * /api/v1/auth/addfavoritecrypto/{userId}:
 *   post:
 *     summary: Add a crypto to user's favorites
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Crypto ID to add to favorites
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Crypto added to favorites successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Crypto added to favorites"
 *               user:
 *                 _id: "userId"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *                 favoriteCryptos: ["cryptoId1", "cryptoId2"]
 *       400:
 *         description: Crypto already in favorites or other validation errors
 *         content:
 *           application/json:
 *             example:
 *               message: "Crypto already in favorites"
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: "User not authenticated"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized access"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 */

router.post("/addfavoritecrypto/:userId", authenticateUser, addFavoriteCrypto);

/**
 * @swagger
 * /api/v1/auth/deleteFavoriteCrypto/{userId}:
 *   post:
 *     summary: Remove a crypto from user's favorites
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Crypto ID to remove from favorites
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Crypto removed from favorites successfully
 *         content:
 *           application/json:
 *             example:
 *               message: |
 *                 Crypto removed from favorites
 *               user:
 *                 _id: "userId"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *                 favoriteCryptos: ["remainingCryptoId1", "remainingCryptoId2"]
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: "User not authenticated"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized access"
 *       404:
 *         description: User not found or Crypto not found in favorites
 *         content:
 *           application/json:
 *             example:
 *               message: |
 *                 User not found
 *                 or
 *                 Crypto not found in favorites
 */

router.post(
  "/deleteFavoriteCrypto/:userId",
  authenticateUser,
  deleteFavoriteCrypto
);

/**
 * @swagger
 * /api/vi/auth/favorite/{userId}:
 *   get:
 *     summary: Get favorite cryptocurrencies for a user
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the user's favorite cryptocurrencies
 *         content:
 *           application/json:
 *             example:
 *               cryptos: ["BTC", "ETH"]
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: "User not authenticated"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized access"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

router.get("/favorite/:userId", authenticateUser, getFavouriteCryptos);

export default router;
