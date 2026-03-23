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
    <div className="mx-auto flex w-full max-w-[clamp(18.75rem,24vw,26rem)] min-h-[clamp(26rem,32vw,34rem)] flex-col justify-center">
      <h1 className="text-center text-[clamp(3.25rem,4vw,4.75rem)] font-bold leading-none text-PrimaryGreen">
        Register
      </h1>
      <p className="mt-3 text-center text-[clamp(0.875rem,1vw,1rem)] text-lightGrey">
        Loneliness is not available here!
      </p>

      {view === "social" ? (
        <>
          <div className="mt-[clamp(2rem,2.2vw,2.75rem)] space-y-[clamp(0.625rem,0.8vw,0.875rem)]">
            <SocialButton icon={<LineIcon />} label="Sign Up With Line" />
            <SocialButton icon={<GoogleIcon />} label="Sign Up With Google" />
            <SocialButton
              icon={<Mail className="h-5 w-5 text-DarkGrey" />}
              label="Sign Up With Email"
              onClick={() => setView("email")}
            />
          </div>

          <label className="mt-[clamp(1rem,1.3vw,1.4rem)] flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-0.5 rounded accent-oonjai-green-400"
            />
            <span className="text-[clamp(0.75rem,0.85vw,0.95rem)] text-DarkGrey">
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
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-[clamp(2rem,2.2vw,2.75rem)] space-y-[clamp(0.75rem,0.95vw,0.95rem)]"
        >
          <AuthInput
            label="Email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(v) => setForm((prev) => ({ ...prev, email: v }))}
            autoComplete="email"
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(v) => setForm((prev) => ({ ...prev, password: v }))}
            autoComplete="new-password"
          />
          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm Your Password"
            value={form.confirmPassword}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, confirmPassword: v }))
            }
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="mt-[clamp(0.5rem,0.9vw,0.9rem)] w-full rounded-[6px] bg-PrimaryGreen py-[clamp(0.75rem,1vw,0.95rem)] text-[clamp(0.875rem,1vw,1rem)] font-semibold text-white shadow-[0_8px_20px_rgba(54,92,72,0.18)] transition-colors hover:bg-oonjai-green-600"
          >
            Sign Up
          </button>
        </form>
      )}

      <p className="mt-[clamp(1.25rem,1.5vw,1.75rem)] text-center text-[clamp(0.75rem,0.85vw,0.95rem)] text-DarkGrey">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-PrimaryGreen hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
