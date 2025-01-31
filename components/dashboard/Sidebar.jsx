"use client";
import { useFetchAccount } from "@/hooks/accounts/actions";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "../general/LoadingSpinner";

function Sidebar() {
  const {
    isLoading: isLoadingAccount,
    data: account,
    refetch: refetchAccount,
  } = useFetchAccount();

  if (isLoadingAccount) return <LoadingSpinner />;

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {/* top */}
      <div>
        <div className="d-flex align-items-center gap-2 mt-2 mb-2">
          <Image
            src="/icon.png"
            className="rounded"
            alt="logo"
            width={35}
            height={35}
          />
          <h5 className="mb-0">LegioConnect</h5>
        </div>
        <hr className="w-100" />

        <div className="card w-100 px-1 py-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <div>
              <Image
                src="/icon.png"
                className="rounded"
                alt="logo"
                width={35}
                height={35}
              />
            </div>

            <div>
              <h6 className="card-title fw-semibold mb-0">
                {account?.first_name}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
