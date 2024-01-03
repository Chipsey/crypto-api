import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;
