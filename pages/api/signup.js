var CryptoJS = require("crypto-js");
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.AES_SECRET
      ).toString(),
    });
    await u.save();

    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "This mothod is not allowed" });
  }
};

export default connectDb(handler);
