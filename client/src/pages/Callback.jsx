// src/pages/Callback.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("กำลังเข้าสู่ระบบ...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    async function handleLogin() {
      if (!token) {
        setStatus("ไม่พบ Token กรุณาเข้าสู่ระบบใหม่");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }
      try {
        // สามารถเรียก backend เพื่อตรวจสอบ token ได้ที่นี่
        localStorage.setItem("accessToken", token);
        setStatus("เข้าสู่ระบบสำเร็จ กำลังไปยัง Dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } catch {
        setStatus("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        setTimeout(() => navigate("/login"), 2000);
      }
    }

    handleLogin();
  }, [navigate]);

  return <div>{status}</div>;
}
