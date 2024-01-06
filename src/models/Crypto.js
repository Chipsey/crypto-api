import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;
