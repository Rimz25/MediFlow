import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await loginUser(form);

      console.log(data); // <-- Add this here

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (err: any) {
      console.log(err.response);
      console.log(err.response?.data);

      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Welcome Back</h1>

        <input
          className="w-full mb-4 p-4 rounded-xl bg-slate-800 text-white"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="w-full mb-6 p-4 rounded-xl bg-slate-800 text-white"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition p-4 rounded-xl font-bold"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <p className="text-center mt-6 text-slate-400">
          Don't have an account?
          <Link className="text-cyan-400 ml-2" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
