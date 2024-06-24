// Imports
// =================================
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "@/actions/signout";

// Page Component
// =================================
export default async function Home() {
  // Server Side Requests
  const { user } = await validateRequest();

  // Session Handling
  if (!user) {
    return redirect("/auth/signin");
  }

  // Render
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Signed In</CardTitle>
          <CardDescription>
            You have been successfully signed in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-lg mb-6">
            <code>{JSON.stringify({ user })}</code>
          </pre>
          <form action={signOut}>
            <Button>Sign Out</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
