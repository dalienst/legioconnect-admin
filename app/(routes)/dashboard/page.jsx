"use client"
import useFetchAccount from '@/hooks/accounts/useFetchAccount';
import React from 'react'

function Dashboard() {
  const { isLoading: isLoadingAccount, data: account } = useFetchAccount();
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard