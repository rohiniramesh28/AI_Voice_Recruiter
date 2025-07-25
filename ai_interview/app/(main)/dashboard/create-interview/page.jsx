'use client';

import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import InterviewLink from './_components/InterviewLink';
import { toast } from 'sonner';

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    duration: '',
    type: '',
    questions: [],  // assuming QuestionList updates this array
  });

  // Handles input change from FormContainer & QuestionList
  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Moves to next step with validation
  const goToNext = () => {
    // Validate step 1 fields before moving to step 2
    if (step === 1) {
      const { jobPosition, jobDescription, duration, type } = formData;
      if (!jobPosition || !jobDescription || !duration || !type) {
        toast('Please enter all details!');
        return;
      }
    }
    setStep(prevStep => Math.min(prevStep + 1, 3));
  };

  // Goes back a step or navigates back in history if on first step
  const goBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(prevStep => Math.max(prevStep - 1, 1));
    }
  };

  return (
    <div className="mt-5 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center mb-5">
        <ArrowLeft onClick={goBack} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>

      <Progress value={(step / 3) * 100} className="my-5" />

      {step === 1 && (
        <FormContainer
          formData={formData}
          onHandleInputChange={onHandleInputChange}
          goToNext={goToNext}
        />
      )}

      {step === 2 && (
        <QuestionList
          formData={formData}
          onHandleInputChange={onHandleInputChange}
          goToNext={goToNext}
          goBack={goBack}
        />
      )}

      {step === 3 && (
        <InterviewLink
          formData={formData}
          goBack={goBack}
        />
      )}
    </div>
  );
}

export default CreateInterview;
