"use client";
import { useRouter } from "next/router";

export default function useRedirect() {
  const router = useRouter();

  const redirectTo = (path: string) => {
    router.push(path);
  };

  return redirectTo;
}
