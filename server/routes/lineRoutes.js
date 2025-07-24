const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");

router.get("/login", lineController.getLineLoginUrl); // ให้ frontend ไปลิงก์เข้าสู่ LINE Login
router.get("/callback", lineController.handleLineCallback); // LINE โยนโค้ดมาให้
// เพิ่ม route สำหรับตรวจสอบ token หรือรีเฟรช token ได้หากต้องการ
router.get("/me", lineController.getLineUserProfile);

module.exports = router;

