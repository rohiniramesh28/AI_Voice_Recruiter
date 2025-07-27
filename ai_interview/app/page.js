"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Lottie from "lottie-react";
import avatar from "@/public/avatar.json";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function Page() {
  const { isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(true);
  const [typingText, setTypingText] = useState("");
  const fullText = "Your future career begins with";

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypingText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black"
      } flex flex-col items-center justify-center relative overflow-hidden px-4`}
    >
      {/* Sign In / User Button */}
      <div className="absolute top-4 right-6 z-50 flex flex-col items-end gap-2">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <Button className="bg-cyan-600 hover:bg-yellow-600 text-white font-semibold shadow-lg">
              Sign In / Sign Up
            </Button>
          </SignInButton>
        )}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 left-6 z-50">
        <Button
          onClick={toggleTheme}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {/* Welcome Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text text-center"
      >
        Welcome to AI Recruiter
      </motion.h1>

      {/* Typing Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className={`mt-4 text-lg md:text-2xl font-medium text-center ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {typingText}
        <span className="animate-pulse">|</span>
      </motion.p>

      {/* Lottie Avatar Animation */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="w-72 md:w-96 mt-10"
      >
        <Lottie animationData={avatar} loop={true} />
      </motion.div>

      {/* Dashboard Button Below Avatar */}
      {isSignedIn && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-8"
        >
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-yellow-600 hover:bg-green-700 text-white px-6 py-2 text-lg rounded-md shadow-md"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      )}
    </div>
  );
}
