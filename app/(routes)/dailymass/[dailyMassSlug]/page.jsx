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

  console.log(dailymass);

  if (isLoadingDailyMass) return <LoadingSpinner />;

  return (
    <div>
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

      <section className="mb-3">
        <h1 className="text-center">{dailymass?.title}</h1>
      </section>

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
        {dailymass?.reading_one_text && (
          <div
            dangerouslySetInnerHTML={{ __html: dailymass.reading_one_text }}
          />
        )}
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
        {dailymass?.responsorial_psalm && (
          <div
            dangerouslySetInnerHTML={{ __html: dailymass.responsorial_psalm }}
          />
        )}
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
          {dailymass?.reading_two_text && (
            <div
              dangerouslySetInnerHTML={{ __html: dailymass.reading_two_text }}
            />
          )}
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
        {dailymass?.gospel_text && (
          <div dangerouslySetInnerHTML={{ __html: dailymass.gospel_text }} />
        )}
      </section>
    </div>
  );
}

export default DailyMassDetail;
