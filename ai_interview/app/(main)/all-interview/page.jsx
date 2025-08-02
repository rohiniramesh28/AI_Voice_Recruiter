"use client"
import { supabase } from '@/app/components/supabaseClient';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

import React, { useEffect, useState } from "react";
import InterviewCard from '../dashboard/_components/InterviewCard';
import { useUser } from '@clerk/nextjs';


function AllInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterviews = async () => {
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("interview")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      
    if (error) {
      toast.error("❌ Error fetching interviews.");
      console.error("Supabase error:", error);
    } else {
      setInterviewList(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl "></h2>
        {!loading && (
          <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700" onClick={fetchInterviews}>
            Refresh
          </Button>
        )}
      </div>

      {loading ? (
        <p className="mt-6 text-center text-gray-500 animate-pulse">
          Loading interviews...
        </p>
      ) : interviewList.length === 0 ? (
        <div className="p-5 mt-6 flex flex-col items-center gap-4 border rounded-md bg-white">
          <Video className="h-10 w-10 text-primary" />
          <p className="text-gray-700"></p>
          <Button onClick={() => (window.location.href = "/interview/create")}>
            Create New Interview
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
          {interviewList.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllInterview