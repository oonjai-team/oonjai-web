"use client";

import { useState } from "react";
import Link from "next/link";
import SocialButton from "../_components/SocialButton";
import AuthInput from "../_components/AuthInput";
import AuthDivider from "../_components/AuthDivider";
import GoogleIcon from "../_components/GoogleIcon";
import LineIcon from "../_components/LineIcon";

export default function LoginPage() {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: implement login
  }

  return (
    <div className="mx-auto flex w-full max-w-[clamp(18.75rem,24vw,26rem)] min-h-[clamp(26rem,32vw,34rem)] flex-col justify-center">
      <h1 className="text-center text-[clamp(3.25rem,4vw,4.75rem)] font-bold leading-none text-PrimaryGreen">
        Login
      </h1>
      <p className="mt-3 text-center text-[clamp(0.875rem,1vw,1rem)] text-lightGrey">
        Loneliness is not available here!
      </p>

      <div className="mt-[clamp(2rem,2.2vw,2.75rem)] space-y-[clamp(0.625rem,0.8vw,0.875rem)]">
        <SocialButton icon={<LineIcon />} label="Continue With Line" />
        <SocialButton icon={<GoogleIcon />} label="Continue With Google" />
      </div>

      <div className="my-2.5">
        <AuthDivider />
      </div>

      <form onSubmit={handleSubmit} className="space-y-[clamp(0.75rem,0.95vw,0.95rem)]">
        <AuthInput
          label="Email"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(v) => setForm((prev) => ({ ...prev, email: v }))}
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(v) => setForm((prev) => ({ ...prev, password: v }))}
          autoComplete="current-password"
        />

        <Link
          href="/forgot-password"
          className="-mt-1 block text-right text-[clamp(0.625rem,0.7vw,0.75rem)] text-lightGrey transition-colors hover:text-PrimaryGreen"
        >
          Forgot your password?
        </Link>

        <button
          type="submit"
          className="mt-[clamp(1.25rem,1.5vw,1.75rem)] w-full rounded-[6px] bg-PrimaryGreen py-[clamp(0.75rem,1vw,0.95rem)] text-[clamp(0.875rem,1vw,1rem)] font-semibold text-white shadow-[0_8px_20px_rgba(54,92,72,0.18)] transition-colors hover:bg-oonjai-green-600"
        >
          Log in
        </button>
      </form>

      <p className="mt-[clamp(1.25rem,1.5vw,1.75rem)] text-center text-[clamp(0.75rem,0.85vw,0.95rem)] text-DarkGrey">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-PrimaryGreen hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
