"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h1>
        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          New user?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}