"use client"
import React, { useContext } from 'react'
import { Timer, Mic, Phone } from 'lucide-react'
import { InterviewDataContex } from '@/context/InterviewDataContex'
import Image from 'next/image';

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContex)

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold h-[400px] text-xl flex justify-between'> {/* 🛠️ added space between h-[400px] and text-xl */}
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer /> 00:00:00
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'> {/* 🛠️ corrected 'boarder' to 'border' */}
          <Image
            src={"/ai.png"}
            alt='ai'
            width={100}
            height={100}
            className='w-[60px] h-[60px] rounded-full object-cover'
          />
          <h2>AI Recruiter</h2>
        </div>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'> {/* 🛠️ corrected 'boarder' to 'border' */}
          <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>
            {interviewInfo?.userName?.[0]}
          </h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
        <div className='flex items-center gap-5 justify-center mt-7'>
          <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
          <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
        </div>
        <h2 className='text-sm text-gray-400 text-center mt-5'>Interview is Progress...</h2>
      </div>
    </div>
  )
}

export default StartInterview
