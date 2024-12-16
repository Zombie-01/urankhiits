"use client";
// pages/generated-designs.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../utils/supabase/client";

const Account = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get the logged-in user when the component mounts
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data?.user);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>

      {user ? (
        <div className="space-y-2">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Created At:</strong> {user.created_at}
          </p>
          <p>
            <strong>Last Sign-In:</strong> {user.last_sign_in_at}
          </p>
          <p>
            <strong>User Metadata:</strong>{" "}
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(user.user_metadata, null, 2)}
            </pre>
          </p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Account;
