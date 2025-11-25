import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match");
      return;
    }
    try {
      let result = await register(form);
      console.log("Registration successful:", result);

      // ✅ backend يرجع { token: "...", message: "Registration successful" }
      localStorage.setItem("token", result.token);

      navigate("/profile");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed");
    }
  };

  return (
    <section className="card form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label>Confirm Password</label>
        <input
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        {error && <div className="alert">{error}</div>}
        <button className="btn">Create account</button>
      </form>
    </section>
  );
}
