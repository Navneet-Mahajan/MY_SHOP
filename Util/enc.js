require("dotenv").config({ path: "../.env" });
const crypto = require("crypto");
const ENC_SECRET_KEY = process.env.ENC_SECRET_KEY;
const ENC_IV = process.env.ENC_IV;
const ALGORITHM = process.env.ALGORITHM;

//to Generate Random Strings
function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

//function to hash password
function hashPassword(password) {
  try {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
  } catch (err) {
    console.error("Hashing error :", err);
    throw err;
  }
}

//function for encrypting email

function encrypt(text) {
  const iv = Buffer.from(ENC_IV, "hex");
  const key = Buffer.from(ENC_SECRET_KEY, "hex");
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(key),
    Buffer.from(iv)
  );

  let cipherText = cipher.update(text, "utf8", "hex");
  cipherText += cipher.final("hex");
  return `${iv.toString("hex")}:${cipherText}`;
}

function decrypt(text) {
  const iv = Buffer.from(ENC_IV, "hex");
  const key = Buffer.from(ENC_SECRET_KEY, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(text.split(":")[1], "hex", "utf-8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

//generate OTP

function generateOTP() {
  // Generate a random number between 0 and 9999
  const otp = Math.floor(Math.random() * 10000);

  // Convert the number to a string and pad it with leading zeros to ensure it's 4 digits
  return otp.toString().padStart(4, "0");
}

module.exports = {
  hashPassword,
  encrypt,
  generateRandomString,
  decrypt,
  generateOTP,
};
