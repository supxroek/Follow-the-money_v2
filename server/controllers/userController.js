// backend/controllers/userController.js
const User = require("../models/User");

// ลงทะเบียนผู้ใช้ (บันทึกข้อมูล user ใหม่)
exports.registerUser = async (req, res) => {
  try {
    const {
      lineId,
      displayName,
      pictureUrl,
      bank,
      accountNumber,
      qrPicUrl,
      contact,
    } = req.body;
    let user = await User.findOne({ lineId });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      lineId,
      displayName,
      pictureUrl,
      bank,
      accountNumber,
      qrPicUrl,
      contact,
    });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ดึงข้อมูลโปรไฟล์ผู้ใช้ตาม lineId
exports.getProfile = async (req, res) => {
  try {
    const { lineId } = req.params;
    const user = await User.findOne({ lineId }).populate("groups");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
