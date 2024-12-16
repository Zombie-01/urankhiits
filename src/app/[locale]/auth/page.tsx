"use client";
import { useState } from "react";
import { supabase } from "../../../../utils/supabase/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Error signing in:", error.message);
    }

    return { data, error };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign in</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Sign in
        </button>
      </form>
    </div>
  );
}
