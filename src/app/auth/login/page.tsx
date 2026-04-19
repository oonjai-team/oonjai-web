"use client";

import Link from "next/link";
import SocialButton from "../_components/SocialButton";
import GoogleIcon from "../_components/GoogleIcon";
import LineIcon from "../_components/LineIcon";
import { useAuth } from "@/lib/auth/AuthContext";

export default function LoginPage() {
  const { oauthLogin } = useAuth();

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
