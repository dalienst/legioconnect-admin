"use client";
import React from "react";
import useUserId from "../useUserId";
import useAxiosAuth from "../useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/accounts";

export default function useFetchAccount() {
  const userId = useUserId();
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["accounts", userId],
    queryFn: () => getUser(userId, axios),
  });
}
