import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (!bearer || !token || bearer.toLowerCase() !== "bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
