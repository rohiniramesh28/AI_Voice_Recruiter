'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';


function InterviewLink({ interviewId, formData }) {
  // Memoize URL to avoid recalculations
  const url = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
    return `${baseUrl}/${interviewId || ''}`;
  }, [interviewId]);

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link Copied!');
    } catch (err) {
      toast.error('Failed to copy the link. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/check.png"
        alt="check"
        width={50}
        height={50}
        className="w-[50px] h-[50px]"
      />

      <h2 className="font-bold text-lg mt-4">Your AI Interview is Ready!</h2>
      <p className="mt-3 text-center">
        Share this link with your candidates to start the job interview
      </p>

      <div className="w-full p-7 mt-6 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-4xl">
            {/* Optional tag/status */}
          </h2>
        </div>

        <div className="mt-3 flex gap-3 items-center">
          <Input value={url} disabled />
          <Button onClick={onCopyLink}>
            <Copy className="mr-2" size={16} /> Copy Link
          </Button>
        </div>
      </div>

      <hr className="my-5 w-full" />

      <div className="flex gap-5">
        {/* You can add additional info or icons here if needed */}
      </div>
    </div>
  );
}

export default InterviewLink;
