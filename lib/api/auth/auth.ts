"use server";

import { useFetch } from "../apiInstance";

export async function LoginApi(username: string, password: string) {
  const fetching = await useFetch({
    url: "/auth/login",
    method: "POST",
    headers: {},
    otherOption: {
      body: JSON.stringify({
        username,
        password,
      }),
    },
  });

  return fetching;
}
