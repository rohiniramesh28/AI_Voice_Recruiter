'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InterviewType as InterviewTypes } from '@/services/Constants';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function FormContainer({ onHandleInputChange, goToNext }) {
  const [selectedInterviewTypes, setSelectedInterviewTypes] = useState([]);

  // Toggle interview type selection and update parent
  const toggleInterviewType = (type) => {
    const updatedTypes = selectedInterviewTypes.includes(type)
      ? selectedInterviewTypes.filter((t) => t !== type)
      : [...selectedInterviewTypes, type];

    setSelectedInterviewTypes(updatedTypes);
    onHandleInputChange('type', updatedTypes); // ✅ No useEffect needed
  };

  return (
    <div className="p-5 bg-white rounded-xl">
      {/* Job Position */}
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          onChange={(e) => onHandleInputChange('jobPosition', e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter detailed job description."
          className="h-[200px] mt-2"
          onChange={(e) => onHandleInputChange('jobDescription', e.target.value)}
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="mt-3 flex gap-3 flex-wrap">
          {InterviewTypes.map((type, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => toggleInterviewType(type.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleInterviewType(type.title);
                }
              }}
              className={`flex items-center cursor-pointer gap-2 p-2 px-3 border border-gray-300 rounded-2xl
                hover:bg-second
                ${
                  selectedInterviewTypes.includes(type.title)
                    ? 'bg-blue-100 text-primary'
                    : 'bg-white'
                }`}
            >
              <type.icon className="w-4 h-4" />
              <span className="text-sm">{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div>
        <Button className="mt-7 flex justify-end" onClick={goToNext}>
          Generate Questions <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
