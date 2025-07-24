const axios = require("axios");
const User = require("../models/User");

exports.getLineLoginUrl = (req, res) => {
  const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
    process.env.LINE_CHANNEL_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.LINE_CALLBACK_URL_CALLBACK
  )}&state=12345abcde&scope=openid%20profile&nonce=09876xyz`;
  res.redirect(lineLoginUrl);
};

exports.handleLineCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    // ขอ access token จาก LINE
    const tokenResponse = await axios.post(
      "https://api.line.me/oauth2/v2.1/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINE_CALLBACK_URL_CALLBACK,
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CLIENT_SECRET,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // ใช้ token ดึง profile user
    const profileResponse = await axios.get("https://api.line.me/v2/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const profile = profileResponse.data;

    // บันทึกหรืออัปเดต user ในฐานข้อมูล
    let user = await User.findOne({ lineId: profile.userId });
    if (!user) {
      user = new User({
        lineId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      });
      await user.save();
    }

    // ส่งข้อมูล user หรือ token กลับ frontend (เช่น JWT token สำหรับการล็อกอิน session)
    res.json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Login with LINE failed");
  }
};

// เพิ่ม endpoint สำหรับดึงข้อมูล user จาก token
exports.getLineUserProfile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  const token = authHeader.replace("Bearer ", "");
  try {
    // ใช้ token ดึง profile user จาก LINE
    const profileResponse = await axios.get("https://api.line.me/v2/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const profile = profileResponse.data;
    // ค้นหา user ในฐานข้อมูล
    let user = await User.findOne({ lineId: profile.userId });
    if (!user) {
      user = new User({
        lineId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      });
      await user.save();
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token or cannot fetch profile" });
  }
};
