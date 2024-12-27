"use client";

import Image from "next/image";
import React from "react";
import extractDate from "@/hooks/useDateFormat";

function UsersTable({ users }) {
  return (
    <>
      {users?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user?.id}>
                  <td>{index + 1}</td>
                  <td>
                    {user?.avatar ? (
                      <Image
                        src={user?.avatar}
                        alt={user?.first_name}
                        width={30}
                        height={30}
                        className="img-fluid rounded-circle"
                      />
                    ) : (
                      <Image
                        src="/profile.svg"
                        alt="avatar"
                        width={30}
                        height={30}
                        className="img-fluid rounded-circle"
                      />
                    )}
                  </td>
                  <td>
                    {user?.first_name} {user?.last_name}
                  </td>
                  <td>{user?.email}</td>
                  <td>{extractDate(user?.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-2 bg-light">No users found</p>
      )}
    </>
  );
}

export default UsersTable;
