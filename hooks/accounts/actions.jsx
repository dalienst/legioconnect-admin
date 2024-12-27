"use client";
import React from "react";
import useUserId from "../useUserId";
import useAxiosAuth from "../useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUser, getUserDetail } from "@/services/accounts";

export function useFetchAccount() {
  const userId = useUserId();
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["account", userId],
    queryFn: () => getUser(userId, axios),
    enabled: !!userId,
  });
}

export function useFetchUsers() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(axios),
  });
}

export function useFetchUserDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["user", slug],
    queryFn: () => getUserDetail(slug, axios),
    enabled: !!slug,
  });
}
