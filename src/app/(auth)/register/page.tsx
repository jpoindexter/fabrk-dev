/**
 * ✅ FABRK REDIRECT
 * Register → Signup redirect for test compatibility
 */

import { redirect } from "next/navigation";

export default function RegisterPage() {
  redirect("/signup");
}
