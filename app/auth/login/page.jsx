"use client";

import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
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
    <div className="container min-h-screen flex items-center justify-center"></div>
  );
}
