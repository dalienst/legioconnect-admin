"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { useFetchDailyMassDetail } from "@/hooks/dailymass/actions";
import Link from "next/link";
import React, { use } from "react";

function DailyMassDetail({ params }) {
  const dailyMassSlug = use(params);

  const {
    isLoading: isLoadingDailyMass,
    data: dailymass,
    refetch: refetchDailyMass,
  } = useFetchDailyMassDetail(dailyMassSlug?.dailyMassSlug);

  if (isLoadingDailyMass) return <LoadingSpinner />;

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/dailymass">Daily Mass</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {dailymass?.lectionary}
          </li>
        </ol>
      </nav>

      {/* Title Section */}
      <section className="mb-3">
        <h1 className="text-center">{dailymass?.title}</h1>
      </section>

      {/* Lectionary and Date Section */}
      <section className="mb-3 d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <p>{dailymass?.lectionary}</p>
        </div>
        <div>
          <p>{dailymass?.mass_date}</p>
        </div>
      </section>

      {/* First Reading */}
      <section className="mb-3">
        <section className="d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center border-bottom">
          <div>
            <h6>Reading 1</h6>
          </div>
          <div>
            <h6>{dailymass?.reading_one}</h6>
          </div>
        </section>
        <p>{dailymass.reading_one_text}</p>
      </section>

      {/* Responsorial Psalm */}
      <section className="mb-3">
        <section className="d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center border-bottom">
          <div>
            <h6>Responsorial Psalm</h6>
          </div>
          <div>
            <h6>{dailymass?.psalm}</h6>
          </div>
        </section>
        <p>{dailymass.responsorial_psalm}</p>
      </section>

      {/* Second Reading */}
      {dailymass?.reading_two && (
        <section className="mb-3">
          <section className="d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center border-bottom">
            <div>
              <h6>Reading 2</h6>
            </div>
            <div>
              <h6>{dailymass?.reading_two}</h6>
            </div>
          </section>
          {dailymass?.reading_two_text && <p>{dailymass.reading_two_text}</p>}
        </section>
      )}

      {/* Gospel */}
      <section className="mb-3">
        <section className="d-flex flex-row flex-md-row justify-content-between align-items-start align-items-md-center border-bottom">
          <div>
            <h6>The Gospel</h6>
          </div>
          <div>
            <h6>{dailymass?.gospel}</h6>
          </div>
        </section>
        <p>{dailymass.gospel_text}</p>
      </section>

      {/* Floating Action Button (FAB) for Update */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Link
          href={`/dailymass/${dailyMassSlug?.dailyMassSlug}/edit`}
          className="btn btn-primary btn-lg rounded-circle shadow"
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="bi bi-pencil"></i>
        </Link>
      </div>
    </div>
  );
}

export default DailyMassDetail;
