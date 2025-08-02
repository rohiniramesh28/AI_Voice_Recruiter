'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InterviewCompleted() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard'); // Optional auto redirect
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-center p-6">
      <div className="text-6xl animate-bounce mb-4">🎉</div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Interview Completed!
      </h1>

      <p className="text-gray-600 mt-3 text-lg max-w-xl">
        Thank you for your time and participation. We’ve recorded your answers and will get back to you soon.
      </p>

      <div className="mt-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-400">You’ll be redirected shortly...</p>
    </div>
  );
}
