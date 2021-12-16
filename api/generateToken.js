import jwt from "jsonwebtoken";
// Access token
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, "mySecretKey", {
    expiresIn: "5s",
  });
};

// Refresh token
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, "myRefreshSecretKey");
};
