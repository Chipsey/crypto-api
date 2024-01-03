import express from "express";
import {
  getAllCryptos,
  addCrypto,
  updateCrypto,
  deleteCrypto,
} from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", getAllCryptos);
router.post("/", addCrypto);
router.put("/:id", updateCrypto);
router.delete("/:id", deleteCrypto);

export default router;
