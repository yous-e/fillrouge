import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let result = await login(form.email, form.password);
      console.log("Login successful:", result);
      localStorage.setItem("token", result.access_token);
      navigate("/profile");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <section className="card form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
        {error && <div className="alert">{error}</div>}
        <button className="btn">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </section>
  );
}
