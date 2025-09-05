import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/dashboard`, {
      method: "GET",
      credentials: "include", // keep session cookie
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message || data.error));
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p className="mt-4">{message}</p>
    </div>
  );
}
