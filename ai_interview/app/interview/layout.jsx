"use client"
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader';
import { InterviewDataContex } from '@/context/InterviewDataContex';

function InterviewLayout({children}) {
    const [interviewInfo,setInterviewInfo]=useState();
  return (
    <InterviewDataContex.Provider value={{interviewInfo,setInterviewInfo}}>
    <div className='bg-secondary'>
        <InterviewHeader/>
        {children}
    </div>
    </InterviewDataContex.Provider>
  )
}

export default InterviewLayout