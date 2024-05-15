"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db/index";

import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { lucia, validateRequest } from "../auth/lucia";
import {
  genericError,
  setAuthCookie,
  validateAuthFormData,
  getUserAuth,
} from "../auth/utils";

import { updateUserSchema } from "../db/schema/auth";
import { UserExtraData } from "../types/user";
import { useFetch } from "../api/apiInstance";
import { LoginApi } from "../api/auth/auth";
import { GeneralApiResponse } from "../types/general";

interface ActionResult {
  error: string;
}

export async function signInAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData);
  if (error !== null) return { error };

  const { username, password } = data;
  const dnaLogin: GeneralApiResponse<UserExtraData> = await LoginApi(
    username,
    password
  );
  if (!!dnaLogin.data.accessToken)
    return {
      error: "Invalid username or password",
    };

  try {
    const existingUser = await db.user.findUnique({
      where: { username: data.username },
    });

    if (!!existingUser && !!existingUser?.id) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      await db.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          ...existingUser,
          username: username,
          name: dnaLogin.data.user.name,
          token: dnaLogin.data.accessToken,
          extra_data: JSON.stringify(existingUser.extra_data),
        },
      });
      setAuthCookie(sessionCookie);
      return redirect("/dashboard");
    } else {
      const userId = generateId(15);
      const newUser = await db.user.create({
        data: {
          id: userId,
          username: username,
          name: dnaLogin.data.user.name,
          token: dnaLogin.data.accessToken,
          extra_data: JSON.stringify(dnaLogin),
        },
      });
      const session = await lucia.createSession(newUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      setAuthCookie(sessionCookie);

      return redirect("/dashboard");
    }
  } catch (e) {
    return genericError;
  }
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData);

  if (error !== null) return { error };

  const hashedPassword = await new Argon2id().hash(data.password);
  const userId = generateId(15);

  try {
    // await db.user.create({
    //   data: {
    //     id: userId,
    //     email: data.email,
    //     hashedPassword,
    //   },
    // });
    console.log(data);
  } catch (e) {
    return genericError;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  setAuthCookie(sessionCookie);
  return redirect("/dashboard");
}

export async function signOutAction(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  setAuthCookie(sessionCookie);
  redirect("/sign-in");
}

export async function updateUser(
  _: any,
  formData: FormData
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };

  const name = formData.get("name") ?? undefined;
  const username = formData.get("username") ?? undefined;

  const result = updateUserSchema.safeParse({ name, username });

  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    if (error.name) return { error: "Invalid name - " + error.name[0] };
    if (error.username)
      return { error: "Invalid username - " + error.username[0] };
    return genericError;
  }

  try {
    await db.user.update({
      data: { ...result.data },
      where: { id: session.user.id },
    });
    revalidatePath("/account");
    return { success: true, error: "" };
  } catch (e) {
    return genericError;
  }
}
