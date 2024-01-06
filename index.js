import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import cryptoRoutes from "./src/routes/cryptoRoutes.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

mongoose.connection.once("open", () => {
  console.log("Database Connected Successfully!");
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto API",
      version: "1.0.0",
      description: "Crypto price API",
    },
    servers: [{ url: "http://localhost:8000" }],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/crypto", cryptoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
