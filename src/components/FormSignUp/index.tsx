"use client";

// Imports
// =================================
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/signup";

// Form Validation
// =================================
export const FormSchemaSignUp = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Component
// =================================
export default function FormSignUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchemaSignUp>>({
    resolver: zodResolver(FormSchemaSignUp),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchemaSignUp>) {
    const result = await signUp(data);
    if (result.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else if (result.success) {
      toast({
        variant: "default",
        description: "An email was sent to confirm the email.",
      });

      router.push("/");
    }
  }

  // Render
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  placeholder="John Smith"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
