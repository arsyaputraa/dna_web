"use client";

import { useFormState, useFormStatus } from "react-dom";

import { signInAction } from "@/lib/actions/users";

import AuthFormError from "@/components/auth/AuthFormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axaLogo from "public/images/axa-logo.png";

export default function SignInPage() {
  const [state, formAction] = useFormState(signInAction, {
    error: "",
  });

  return (
    <div className="max-w-sm flex flex-col items-center mx-auto my-4">
      <Image
        src={axaLogo}
        width={200}
        height={200}
        alt="axa logo"
        className="mx-auto"
      />
      <h1 className="my-2 text-lg font-semibold">DNA SERVICES</h1>
      <main className="bg-popover w-full p-10">
        <h1 className="text-2xl font-bold text-center">Sign in</h1>
        <AuthFormError state={state} />
        <form action={formAction}>
          <Label htmlFor="username" className="text-muted-foreground">
            Username
          </Label>
          <Input name="username" id="username" type="text" required />
          <br />
          <Label htmlFor="password" className="text-muted-foreground">
            Password
          </Label>
          <Input type="password" name="password" id="password" required />
          <br />
          <SubmitButton />
        </form>
      </main>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Sign{pending ? "ing" : ""} in
    </Button>
  );
};
