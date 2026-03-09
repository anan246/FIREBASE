"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-80">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Firebase Todo App
        </h1>
        <p className="text-gray-600 mb-6">
          Sign up or sign in to continue
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/signup")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/signin")}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}