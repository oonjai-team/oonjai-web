"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import SocialButton from "../_components/SocialButton";
import AuthInput from "../_components/AuthInput";
import GoogleIcon from "../_components/GoogleIcon";
import LineIcon from "../_components/LineIcon";

export default function RegisterPage() {
  const [view, setView] = useState<"social" | "email">("social");
  const [form, setForm] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: implement registration
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center">
      <h1 className="text-center text-5xl font-bold leading-none text-PrimaryGreen">
        Register
      </h1>
      <p className="mt-3 text-center text-md text-lightGrey">
        Loneliness is not available here!
      </p>

        <>
          <div className="mt-10 space-y-4">
            <SocialButton icon={<LineIcon />} label="Sign Up With Line" />
            <SocialButton icon={<GoogleIcon />} label="Sign Up With Google" />
            <SocialButton
              icon={<Mail className="h-5 w-5 text-DarkGrey" />}
              label="Sign Up With Email"
              onClick={() => setView("email")}
            />
          </div>

          <label className="mt-6 flex justify-center items-center gap-2">
            <input
              type="checkbox"
              className="mt-0.5 rounded accent-oonjai-green-400"
            />
            <span className="text-sm text-DarkGrey">
              I have read and accept the{" "}
              <Link
                href="/terms"
                className="text-PrimaryGreen underline hover:text-oonjai-green-600"
              >
                Terms of Service
              </Link>
            </span>
          </label>
        </>

      <p className="mt-10 text-center text-sm text-DarkGrey">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-PrimaryGreen hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
