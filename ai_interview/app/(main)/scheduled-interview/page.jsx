"use client";

import { supabase } from "@/app/components/supabaseClient";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetInterviewList = async () => {
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("interview")
      .select(`
        id,
        jobPosition,
        duration,
        interview_id,
        created_at,
        interview-feedback(userEmail, feedback, created_at)
      `) // Confirm relation name here!
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Supabase fetch error:", error);
    } else {
      setInterviewList(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      GetInterviewList();
    }
  }, [user]);

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl mb-4">Interview List With Candidate Feedback</h2>

      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading interviews...</p>
      )}

      {!loading && interviewList.length === 0 && (
        <div className="p-5 mt-6 flex flex-col items-center gap-4 border rounded-md bg-white">
          <Video className="h-10 w-10 text-primary" />
          <p className="text-gray-700">No interviews scheduled yet.</p>
          <Button onClick={() => window.location.assign("/interview/create")}>
            Create New Interview
          </Button>
        </div>
      )}

      {!loading && interviewList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
          {interviewList.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
