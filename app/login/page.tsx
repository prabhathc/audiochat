"use client";
import { Button } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";

export default function Login() {
  const [isFirstPage, setIsFirstPage] = useState(true);

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `/auth/${provider}`;
  };

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight) {
        setIsFirstPage(true);
      } else {
        setIsFirstPage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white relative">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
        <div className="flex-grow flex flex-col items-center justify-center w-full p-10">
          <div className="flex items-center text-lg font-medium mb-10 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
            </svg>
            Acme Inc
          </div>
          <blockquote className="space-y-2 text-center text-white">
            <p className="text-lg">
              “This library has saved me countless hours of work and helped me
              deliver stunning designs to my clients faster than ever before.”
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
        <div className="flex-shrink-0 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
            onClick={handleScrollDown}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <div className="flex-grow flex flex-col items-center justify-center w-full p-8 lg:p-16">
          <div className="w-full max-w-md flex flex-col space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create an account
              </h1>
              <p className="text-sm text-gray-400">
                Choose a method to create your account
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleOAuthLogin("google")}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-150"
              >
                Login with Google
              </button>
              <button
                onClick={() => handleOAuthLogin("discord")}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-150"
              >
                Login with Discord
              </button>
            </div>
            <p className="text-center text-sm text-gray-400">
              By clicking continue, you agree to our{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
            onClick={handleScrollUp}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
