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
    <div className="mx-auto flex w-full flex-col justify-center">
      <h1 className="text-center text-5xl font-bold leading-none text-PrimaryGreen">
        Login
      </h1>
      <p className="mt-3 text-center text-md text-lightGrey">
        Loneliness is not available here!
      </p>

      <div className="mt-6 space-y-4">
        <SocialButton icon={<LineIcon />} label="Continue With Line" />
        <SocialButton icon={<GoogleIcon />} label="Continue With Google" />
      </div>

      <div className="my-2.5">
        <AuthDivider />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
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
        </div>

        <Link
          href="/forgot-password"
          className="-mt-1 block text-right text-xs text-lightGrey transition-colors hover:text-PrimaryGreen"
        >
          Forgot your password?
        </Link>

        <button
          type="submit"
          className="mt-4 w-full rounded-[6px] bg-PrimaryGreen py-3 text-md font-medium text-white shadow-[0_8px_20px_rgba(54,92,72,0.18)] transition-colors hover:bg-oonjai-green-600"
        >
          Log in
        </button>
      </form>

      <p className="mt-8 text-center text-[clamp(0.75rem,0.85vw,0.95rem)] text-DarkGrey">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-bold text-PrimaryGreen hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
