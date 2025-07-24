import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/login");
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-200 to-indigo-200">
      <h1 className="text-4xl font-bold text-indigo-800 mb-4">
        Follow the money's
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        ระบบแบ่งค่าใช้จ่ายกลุ่ม, แจ้งเตือน และเชื่อมต่อ LINE
      </p>
      <div className="text-2xl text-indigo-600 font-semibold">{countdown}</div>
    </div>
  );
}
