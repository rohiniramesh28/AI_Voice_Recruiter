'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';

import QuestionListContainer from './QuestionListContainer';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
// <-- Add this!

const supabase = createClient(); // <-- Needed to call Supabase

function QuestionList({ formData, goBack, goToNext }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData?.jobPosition) {
      GenerateQuestionList();
    }
  }, []);

  const GenerateQuestionList = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // <-- important
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch questions');
      }

      const result = await res.json();

      if (result?.message) {
        const questions = result.message
          .split('\n')
          .filter(q => q.trim())
          .map(q => q.replace(/^[-•\d.]+\s*/, '').trim());

        setQuestionList(questions);
      } else {
        toast.error('No questions returned from AI.');
      }
    } catch (err) {
      console.error('Question generation error:', err);
      toast.error('Something went wrong while generating questions');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    const { data, error } = await supabase.from('Interviews').insert([
      {
        ...formData,
        questionList,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        interview_id,
      },
    ]);

    setSaveLoading(false);

    if (error) {
      toast.error('Failed to save interview.');
    } else {
      toast.success('Interview saved!');
      goToNext(); // move to step 3
    }
  };

  return (
    <div>
      {loading ? (
        <div className="p-5 bg-blue-50 rounded-xl border flex items-center gap-3">
          <Loader2Icon className="animate-spin w-5 h-5 text-primary" />
          <div>
            <h2 className="font-medium">Generating Interview Questions...</h2>
            <p className="text-primary">
              Our AI is crafting the perfect questions for you.
            </p>
          </div>
        </div>
      ) : (
        <>
          {questionList.length > 0 ? (
            <QuestionListContainer questionList={questionList} />
          ) : (
            <p className="text-sm text-muted-foreground mt-4">
              No questions generated.
            </p>
          )}
          <div className="flex justify-end mt-10">
            <Button onClick={onFinish} disabled={saveLoading}>
              {saveLoading ? 'Saving...' : 'Finish'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionList;
