"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { supabase } from "@/app/components/supabaseClient";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);

  useEffect(() => {
    if (user && interview_id) {
      const fetchData = async () => {
        const result = await supabase
          .from("interview")
          .select(
            `jobPosition, jobDescription, type, questionList, duration, interview_id, created_at,
             interview-feedback(userEmail, userName, feedback, created_at)`
          )
          .eq("email", user?.email) // <-- Confirm this column name in your DB
          .eq("interview_id", interview_id);

        console.log(result);

        if (result.error) {
          console.error("❌ Supabase fetch error:", result.error);
          setInterviewDetail(null);
        } else {
          setInterviewDetail(result.data?.[0] || null);
        }
      };

      fetchData();
    }
  }, [user, interview_id]);

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
    </div>
  );
}

export default InterviewDetail;
