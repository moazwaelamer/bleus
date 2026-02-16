import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./login.css";

export default function Login({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ===== Prevent Scroll When Open ===== */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const cleanEmail = form.email.trim().toLowerCase();
    const cleanPassword = form.password.trim();

    /* ===== SIGN UP ===== */
    if (isSignup) {
      if (!form.name.trim()) {
        setError("Please enter your name");
        return;
      }

      if (users.some((u) => u.email === cleanEmail)) {
        setError("Email already exists");
        return;
      }

      const newUser = {
        username: form.name.trim(),
        email: cleanEmail,
        password: cleanPassword,
      };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      setForm({ name: "", email: "", password: "" });
      setIsSignup(false);
      return;
    }

    /* ===== LOGIN ===== */
    const found = users.find(
      (u) =>
        u.email === cleanEmail &&
        u.password === cleanPassword
    );

    if (!found) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(found));

    setForm({ name: "", email: "", password: "" });
    onClose();
  };

  return (
    <motion.div
      className="login-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
     <motion.div
  className="login-panel"
  initial={{ x: 80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 80, opacity: 0 }}
  transition={{
    duration: 0.28,
    ease: [0.22, 1, 0.36, 1]
  }}
  onClick={(e) => e.stopPropagation()}
>
        <button className="close-btn" onClick={onClose}>
          CLOSE ✕
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSignup ? "signup" : "login"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <h2>
              {isSignup
                ? "Create Your Account"
                : "Log Into Your Account"}
            </h2>

            {/* ===== Social Login (Login only) ===== */}
            {!isSignup && (
              <>
                <div className="social-buttons">
                  <button type="button" className="fb">
                    Log In With Facebook
                  </button>

                  <button type="button" className="google">
                    Log In With Google
                  </button>

                  <button type="button" className="apple">
                    Log In With Apple
                  </button>
                </div>

                <div className="divider">
                  <span>OR</span>
                </div>
              </>
            )}

            {/* ===== FORM ===== */}
            <form onSubmit={handleSubmit} autoComplete="off">
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  autoComplete="off"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="continue-btn">
                {isSignup ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* ===== ERROR MESSAGE ===== */}
            {error && <p className="error-msg">{error}</p>}

            <p
              className="switch-text"
              onClick={() => {
                setError("");
                setIsSignup(!isSignup);
              }}
            >
              {isSignup
                ? "Already have an account?"
                : "Don’t have an account?"}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}