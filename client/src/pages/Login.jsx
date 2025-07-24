// src/pages/Login.jsx
import React from "react";

export default function Login() {
  const handleLogin = () => {
    // ใช้ environment variable เพื่อรองรับ production/dev
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ||
      "https://follow-the-money-v2.onrender.com";
    window.location.href = `${backendUrl}/api/line/login`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">เข้าสู่ระบบด้วย LINE</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Login with LINE
      </button>
    </div>
  );
}
