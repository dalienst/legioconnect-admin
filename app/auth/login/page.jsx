"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    const session = await getSession();

    if (response?.error) {
      setLoading(false);
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful! Redirecting...");
      if (session?.user?.is_staff === true) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="auth-screen bg-light px-2">
      <div
        className="card shadow p-4 rounded"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3" style={{ color: "#4b1719" }}>Welcome Back!</h3>
        <p className="text-center text-muted">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn"
              disabled={loading}
              
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
