"use client"

import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import {Clock,Info,Video} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {supabase} from '@/services/supabaseClient'
import React,{useContext,useEffect,useState} from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation'; 




function Interview() {
  const {interview_id}=useParms();
  console.log(interview_id)
  const [interviewData,setInterviewData]=useState();
  const [userName,setUserName]=useState();
  const [loading,setLoading]=useState(false);
  const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext)
  const router=useRouter();
  useEffect(()=>{
    interview_id&&GetInterviewDetails();
  },[interview_id])

  const GetInterviewDetails =async()=>{
    setLoading(true);
    try{
    let {data:Interviews,error}=await supabase
           .from('Interviews')
           .select("jobPosition,jobDescription,duration,type")
           .eq('interview_id',interview_id)
          setInterviewData(Interviews[0]);
          if(Interview?.length==0)
          {toast ('Incorrect Interview Link')
            return ;
          }
            setLoading(false);
    }catch(e){
          setLoading(false);
          toast ('Incorrect Interview Link')
  }
   const onJoinInterview=async()=>{
             setLoading(true);
    let {data:Interviews,error}=await supabase
           .from('Interviews')
           .select("*")
           .eq('interview_id',interview_id)
          setInterviewData(Interviews[0]);
         
          console.log(Interviews[0]);
          setInterviewInfo({
             userName:userName,
             InterviewData:Interviews[0]
         });
          router.push('/interview/+interview_id+/start')
          setLoading(false);
   }  
  }
  return (
   
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-7'>
      < div className='flex flex-col item-centerjustify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52'>
      <Image src={'/logo.png'} alt='logo' width={200} height={200}
      className='w-[140px]'/>
      <h2 className='mt-3'>AI-Powered Interview Platform</h2>

      <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-[250px] my-6'/>

      <h2 className='font-bold text-lg '>{interviewData?.jobPosition}</h2>
      <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration}</h2>
    <div className='w-full'>
      <h2>Enter your full name</h2>
      <input placeholder='e.g. Jhon' onChange={(event)=>setUserName(event.target.value)}/>
      
    </div>
    <div>
    <div className='p-3 bg-blue-100 gap-4 rounded-lg'>
      <Info classNmae='text-primary'/>
      <h2 className='font-bold'>Before you begin</h2>
      <ul className=''>
        <li className='text-sn text-primary'>Test your camera and microphone </li>
        <li className='text-sn text-primary'>Ensure you a stable internet connection  </li>
        <li className='text-sn text-primary'>Find a quite place for interview  </li>
      </ul>
    </div>
    </div>
    <Button className={'mt-5 w-full font-bold'} disabled={loading ||!userName}
    onClick={()=>onJoinInterview()} ><Video/>{loading&&<Loader2Icon/>} Join interview</Button>
    </div>
    </div>
  )
}

export default Interview
