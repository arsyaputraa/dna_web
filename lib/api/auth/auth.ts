"use server";

import { useFetch } from "../apiInstance";

export async function LoginApi(username: string, password: string) {
  const fetching = await useFetch({
    url: "/auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      versionCode: "2",
      versionName: "1.0.1",
      deviceType: "dna-tablet-android",
      deviceId: "2D1A871D-337B-43D7-A1B8-161AD22ECE1D",
    },
    otherOption: {
      body: JSON.stringify({
        username,
        password,
        fcmToken: "asajdsaads",
      }),
    },
  });

  return fetching;
}
