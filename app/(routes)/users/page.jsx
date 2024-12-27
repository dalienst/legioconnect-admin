"use client";
import React, { useState } from "react";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import UsersTable from "@/components/users/UsersTable";
import { useFetchUsers } from "@/hooks/accounts/actions";

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
      <h6 className="text-uppercase text-muted">User List</h6>

      <section className="mb-3">
        <h3 className="dash-text">Users</h3>
        <p className="lead small">Find all platform users here</p>
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
