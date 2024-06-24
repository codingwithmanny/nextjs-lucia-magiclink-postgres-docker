// Imports
// =================================
import FormSignUp from "@/components/FormSignUp";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/lucia";
import Link from 'next/link';
import { redirect } from "next/navigation";

// Page Component
// =================================
export default async function SignUp() {
  // Server Side Requests
  const { user } = await validateRequest();

  // Session Handling
  if (user) {
    return redirect("/");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Sign-up with your email and password. Already have an account? <Link href="/auth/signin">Sign In</Link>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormSignUp />
        </CardContent>
      </Card>
    </>
  );
}
