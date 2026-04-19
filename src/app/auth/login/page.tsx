"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SocialButton from "../_components/SocialButton";
import AuthInput from "../_components/AuthInput";
import AuthDivider from "../_components/AuthDivider";
import GoogleIcon from "../_components/GoogleIcon";
import LineIcon from "../_components/LineIcon";
import { useAuth } from "@/lib/auth/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, oauthLogin, needsOnboarding } = useAuth();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(form.email, form.password);

    if (result.success) {
      router.push(needsOnboarding ? "/onboarding" : "/activity-status");
    } else {
      setError(result.error || "Login failed");
    }
    setLoading(false);
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
        <SocialButton icon={<LineIcon />} label="Continue With Line" onClick={() => oauthLogin("line")} />
        <SocialButton icon={<GoogleIcon />} label="Continue With Google" onClick={() => oauthLogin("google")} />
      </div>

      <div className="my-2.5">
        <AuthDivider />
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

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
          disabled={loading}
          className="mt-4 w-full rounded-[6px] bg-PrimaryGreen py-3 text-md font-medium text-white shadow-[0_8px_20px_rgba(54,92,72,0.18)] transition-colors hover:bg-oonjai-green-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
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
