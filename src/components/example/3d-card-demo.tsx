"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ThreeDCardDemo() {
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoad(true);
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // if (response.ok) {
    //   toast.success("Email sent successfully");
    // } else {
    //   toast.error("Error sending email");
    // }
    setLoad(false);
  };
  return (
    <div className="inter-var">
      <div className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <div className="text-xl font-bold text-neutral-600 dark:text-white">
          Sent us email
        </div>
        <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          more info{" "}
        </p>
        <div className="w-full mt-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                value={formData.name}
                onChange={handleChange}
                id="name"
                name="name"
                placeholder="Tyler"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="94311521"
                type="text"
              />
            </LabelInputContainer>
          </div>
        </div>
        <div className="w-full mt-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
        </div>
        <div className="w-full mt-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="...."
            />
          </LabelInputContainer>
        </div>
        <div className="flex justify-between items-center mt-20">
          <div className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            <button onClick={() => handleSubmit()} type="submit">
              Sent message &rarr;
              <BottomGradient />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
