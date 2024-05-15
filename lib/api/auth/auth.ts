"use server";

import { useFetch } from "../apiInstance";

export async function LoginApi(username: string, password: string) {
  const fetching = await useFetch({
    url: "/auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    otherOption: {
      body: JSON.stringify({
        username,
        password,
        fcmToken: "asajdsaads",
      }),
    },
  });

  console.error("ini ressponse login", fetching);

  return fetching;
}
