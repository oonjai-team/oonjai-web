"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import SocialButton from "../_components/SocialButton";
import AuthInput from "../_components/AuthInput";
import GoogleIcon from "../_components/GoogleIcon";
import LineIcon from "../_components/LineIcon";
import { useAuth } from "@/lib/auth/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, oauthLogin } = useAuth();
  const [view, setView] = useState<"social" | "email">("social");
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.firstname.trim() || !form.lastname.trim()) {
      setError("First name and last name are required");
      return;
    }

    setLoading(true);
    const result = await register({
      email: form.email,
      firstname: form.firstname,
      lastname: form.lastname,
    });

    if (result.success) {
      router.push("/onboarding");
    } else {
      setError(result.error || "Registration failed");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center">
      <h1 className="text-center text-5xl font-bold leading-none text-PrimaryGreen">
        Register
      </h1>
      <p className="mt-3 text-center text-md text-lightGrey">
        Loneliness is not available here!
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {view === "social" ? (
        <>
          <div className="mt-10 space-y-4">
            <SocialButton icon={<LineIcon />} label="Sign Up With Line" onClick={() => oauthLogin("line")} />
            <SocialButton icon={<GoogleIcon />} label="Sign Up With Google" onClick={() => oauthLogin("google")} />
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
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <AuthInput
                label="First Name"
                type="text"
                placeholder="first name"
                value={form.firstname}
                onChange={(v) => setForm((prev) => ({ ...prev, firstname: v }))}
                autoComplete="given-name"
              />
            </div>
            <div className="flex-1">
              <AuthInput
                label="Last Name"
                type="text"
                placeholder="last name"
                value={form.lastname}
                onChange={(v) => setForm((prev) => ({ ...prev, lastname: v }))}
                autoComplete="family-name"
              />
            </div>
          </div>
          <AuthInput
            label="Email"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={(v) => setForm((prev) => ({ ...prev, email: v }))}
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-[6px] bg-PrimaryGreen py-3 text-md font-medium text-white shadow-[0_8px_20px_rgba(54,92,72,0.18)] transition-colors hover:bg-oonjai-green-600 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => setView("social")}
            className="w-full text-center text-sm text-lightGrey hover:text-PrimaryGreen"
          >
            Back to other options
          </button>
        </form>
      )}

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
