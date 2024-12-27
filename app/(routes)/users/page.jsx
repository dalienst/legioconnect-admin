"use client";
import React, { useState } from "react";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import UsersTable from "@/components/users/UsersTable";
import { useFetchUsers } from "@/hooks/accounts/actions";
import Link from "next/link";

function UserList() {
  const {
    isLoading: isLoadingUsers,
    data: users,
    refetch: refetchUsers,
  } = useFetchUsers();

  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on the search query
  const filteredUsers = users?.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingUsers) return <LoadingSpinner />;

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            All Users
          </li>
        </ol>
      </nav>

      <section className="mb-3">
        <h3 className="dash-text">Users and Accounts</h3>
        <p className="lead small">
          Manage all platform users in one place. You can also review and handle
          account deletion requests here.
        </p>
      </section>

      <section className="mb-3 col-md-3">
        <input
          type="search"
          name="users"
          id="users"
          className="form-control rounded-0"
          placeholder="Find a User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section>
        <UsersTable users={filteredUsers} />
      </section>
    </div>
  );
}

export default UserList;
