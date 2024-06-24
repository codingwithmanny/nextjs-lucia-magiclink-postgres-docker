// Imports
// =================================
import FormSignIn from "@/components/FormSignIn";
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
export default async function SignIn() {
  // Server Side Requests
  const { user } = await validateRequest();

  // Session Handling
  if (user) {
    return redirect("/");
  }

  // Render
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign-in with your email and password. Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormSignIn />
        </CardContent>
      </Card>
    </>
  );
}
