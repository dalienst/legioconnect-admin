"use client";
import useFetchAccount from "@/hooks/accounts/useFetchAccount";
import { useFetchDailyVerses } from "@/hooks/dailyverse/dailyverse";
import React from "react";

function Dashboard() {
  const { isLoading: isLoadingAccount, data: account } = useFetchAccount();
  const {
    isLoading: isLoadingDailyVerses,
    data: dailyverses,
    refetch: refetchDailyVerse,
  } = useFetchDailyVerses();

  console.log(dailyverses);

  return (
    <div className="container-fluid">
      <section className="mb-3">
        <h3 className="dash-text">Hello, {account?.first_name}</h3>
      </section>
    </div>
  );
}

export default Dashboard;
