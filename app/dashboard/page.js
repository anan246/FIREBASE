"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/signin");
    } else {
      const fetchProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data());
      };
      fetchProfile();
    }
  }, []);

  if (!profile)
    return <p className="text-center mt-10 text-lg">Loading dashboard...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {profile.name}!</h1>
        <p className="text-gray-600 mb-2">Email: {profile.email}</p>
        <p className="text-gray-600 mb-6">Age: {profile.age}</p>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/todos")}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            Todo Manager
          </button>
          <button
            onClick={() => {
              auth.signOut();
              router.push("/signin");
            }}
            className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}