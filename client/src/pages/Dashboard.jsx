import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("ไม่พบ Token กรุณาเข้าสู่ระบบใหม่");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    fetch(`${window.location.origin}/api/line/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setError("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
          setTimeout(() => navigate("/login"), 1500);
        }
      })
      .catch(() => {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
        setTimeout(() => navigate("/login"), 1500);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Welcome, {user.displayName}</h1>
      <img src={user.pictureUrl} alt="Profile" className="rounded-full w-32 h-32 mb-4" />
      <div className="text-lg text-gray-700 mb-2">LINE ID: {user.lineId}</div>
      <button
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}
