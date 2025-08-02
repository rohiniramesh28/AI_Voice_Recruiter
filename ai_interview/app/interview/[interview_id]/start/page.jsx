'use client'

import { InterviewDataContex } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import { supabase } from '@/app/components/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContex);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(false);

  useEffect(() => {
    if (interviewInfo) startCall();
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      .map((item) => item?.question)
      .join(', ');

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'playht',
        voiceId: 'jennifer',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
              You are an AI voice assistant conducting interviews.
              Begin with a friendly introduction like:
              "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started with a few questions!"
              Ask the following questions one by one, listening after each:
              Questions: ${questionList}
              Give hints if needed, respond naturally, and offer feedback.
              After 5-7 questions, summarize their performance positively.
              End by thanking them and wishing good luck.
              Stay engaging, friendly, and focused on React.
            `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = async () => {
    setLoading(true);
    try {
      await vapi.stop();
      console.log('Call manually stopped.');
      await GenerateFeedback();
    } catch (err) {
      console.error('Error stopping interview:', err);
      toast.error('Failed to stop interview');
    } finally {
      setLoading(false);
    }
  };

  const GenerateFeedback = async () => {
    if (feedbackGenerated || !conversation) return;
    setFeedbackGenerated(true);
    try {
      const result = await axios.post('/api/ai-feedback', { conversation });

      // The server should return full parsed feedback in `.data`, not `.data.content`
      const feedback = result.data;

      const { error } = await supabase.from('interview-feedback').insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id,
          feedback,
          recommended: false, // Make sure this column exists in Supabase
        },
      ]);

      if (error) {
        console.error('Supabase error:', error);
        toast.error('Failed to save feedback');
      } else {
        toast.success('Feedback saved');
        router.replace(`/interview/${interview_id}/completed`);
      }
    } catch (err) {
      console.error('Feedback generation error:', err);
      toast.error('Failed to generate feedback');
    }
  };

  useEffect(() => {
    const handleMessage = (message) => {
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        setConversation(convoString);
      }
    };

    const handleCallStart = () => {
      toast('Call Connected...');
    };

    const handleSpeechStart = () => {
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      setActiveUser(true);
    };

    const handleCallEnd = () => {
      toast('Interview ended');
      GenerateFeedback();
    };

    vapi.on('message', handleMessage);
    vapi.on('call-start', handleCallStart);
    vapi.on('Speech-Start', handleSpeechStart);
    vapi.on('Speech-end', handleSpeechEnd);
    vapi.on('call-end', handleCallEnd);

    return () => {
      vapi.off('message', handleMessage);
      vapi.off('call-start', handleCallStart);
      vapi.off('Speech-Start', handleSpeechStart);
      vapi.off('Speech-end', handleSpeechEnd);
      vapi.off('call-end', handleCallEnd);
    };
  }, []);

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
        {/* AI Recruiter */}
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center mt-5'>
          <div className='relative'>
            {!activeUser && (
              <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>
            )}
            <Image
              src='/OIP.png'
              alt='AI'
              width={60}
              height={60}
              className='w-[60px] h-[60px] rounded-full object-cover'
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        {/* Candidate */}
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center mt-5'>
          <div className='relative'>
            {activeUser && (
              <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>
            )}
            <h2 className='text-2xl bg-primary text-white rounded-full p-6'>
              {interviewInfo?.userName?.[0] || 'U'}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {/* Controls */}
      <div className='flex items-center gap-5 justify-center mt-3'>
        <Mic className='h-12 w-12 bg-gray-700 text-white rounded-full cursor-pointer' />

        <AlertConfirmation stopInterview={stopInterview}>
          {!loading ? (
            <Phone
              className='h-12 w-12 bg-red-700 text-white rounded-full cursor-pointer'
              onClick={stopInterview}
            />
          ) : (
            <Loader2Icon className='h-12 w-12 animate-spin text-gray-500' />
          )}
        </AlertConfirmation>
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>
        Interview in Progress....
      </h2>
    </div>
  );
}

export default StartInterview;
