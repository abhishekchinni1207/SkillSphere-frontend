import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (res.data?.user) {
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
      <div className="bg-white border border-pink-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Create an Account 🌸
        </h2>

        {error && (
          <p className="bg-pink-100 text-pink-700 border border-pink-200 p-2 rounded-lg mb-4 text-center text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-yellow-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-blue-600 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 font-medium hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
