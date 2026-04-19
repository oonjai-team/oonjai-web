"use client";

import Link from "next/link";
import SocialButton from "../_components/SocialButton";
import GoogleIcon from "../_components/GoogleIcon";
import LineIcon from "../_components/LineIcon";
import { useAuth } from "@/lib/auth/AuthContext";

export default function RegisterPage() {
  const { oauthLogin } = useAuth();

  return (
    <div className="mx-auto flex w-full flex-col justify-center">
      <h1 className="text-center text-5xl font-bold leading-none text-PrimaryGreen">
        Register
      </h1>
      <p className="mt-3 text-center text-md text-lightGrey">
        Loneliness is not available here!
      </p>

      <div className="mt-10 space-y-4">
        <SocialButton icon={<LineIcon />} label="Sign Up With Line" onClick={() => oauthLogin("line")} />
        <SocialButton icon={<GoogleIcon />} label="Sign Up With Google" onClick={() => oauthLogin("google")} />
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
