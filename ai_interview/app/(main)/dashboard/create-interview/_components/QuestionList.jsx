"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@clerk/nextjs";

import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/ai-model", formData); // adjust route if needed
      const generatedQuestions = response.data?.content || [];

      setQuestionList(generatedQuestions);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);

    const interview_id = uuidv4();
    const payload = {
      ...formData,
      questionList: questionList,
      userEmail: user?.email || "unknown@example.com",
      interview_id,
    };

    console.log("Interview Saved Payload:", payload);

    // You can replace the above console.log with an API call like:
    // await axios.post("/api/save-interview", payload);

    setSaveLoading(false);
    toast.success("Interview saved successfully!");
  };

  return (
    <div>
      {loading && <Loader2Icon className="animate-spin" />}

      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading ? "Saving..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
