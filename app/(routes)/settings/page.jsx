"use client";
import useFetchAccount from "@/hooks/accounts/useFetchAccount";
import React from "react";

export default function Settings() {
  const { isLoading: isLoadingAccount, data: account } = useFetchAccount();
  return <div>Settings</div>;
}
