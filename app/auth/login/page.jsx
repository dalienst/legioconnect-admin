"use client";

import { signIn } from "next-auth/react";
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

    if (response?.error) {
      setLoading(false);
      toast?.error("Invalid email or password");
    } else {
      toast?.success("Login successful! Redirecting...");
      setLoading(false);
      router.push("/dashboard");
    }
  };
  return (
    <div className="container auth-screen">
      <div>
        <form className="w-100 p-3 shadow rounded bg-white">
          <h3 className="text-start">Glad To See You Again</h3>
          <p className="lead text-start mt-2 fs-6">
            Enter your credentials to access account
          </p>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 btn-outline-success"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
