"use client";

import { useFormState, useFormStatus } from "react-dom";

import { signInAction } from "@/lib/actions/users";

import AuthFormError from "@/components/auth/AuthFormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction] = useFormState(signInAction, {
    error: "",
  });

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="max-w-sm flex flex-col items-center mx-auto my-4">
      <Image
        src={"/images/axa-logo.png"}
        width={200}
        height={200}
        alt="axa logo"
        className="mx-auto"
      />
      <h1 className="my-2 text-lg font-semibold">DNA SERVICES</h1>
      <main className="bg-popover w-full p-10 rounded-lg">
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
          {/* <div className="relative flex">
            <Input
              className=""
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
            />
            <Button
              variant="ghost"
              className="absolute right-0 z-10"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div> */}
          <Input
            endAdornment={
              <button
                className="p-0 h-5 w-5 text-center"
                onClick={handleShowPassword}
                type="button"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
          />

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
