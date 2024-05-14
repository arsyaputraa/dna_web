"use server";

import { validateRequest } from "../auth/lucia";

interface UseFetchProps {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "OPTION";
  headers?: HeadersInit & {
    "Content-Type": string;
    Authorization?: string;
  };
  otherOption?: RequestInit;
}

export const useFetch = async <T>({
  ...props
}: UseFetchProps): Promise<{
  data: T | any;
  status: number;
  isSuccess: boolean;
}> => {
  const { user } = await validateRequest();
  const fetching = await fetch(
    `${process.env.NEXT_PUBLIC_API_DEV_URL}${props.url}`,
    {
      method: props.method,
      headers:
        !!props.headers && !!props.headers.Authorization
          ? props.headers
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
      ...props.otherOption,
    }
  );

  console.error("fetchinggg", fetching);

  try {
    const result = await fetching.json();
    return {
      data: result,
      status: fetching.status,
      isSuccess: fetching.ok ? true : false,
    };
  } catch (error) {
    return {
      data: JSON.stringify(error),
      status: fetching.status,
      isSuccess: fetching.ok ? true : false,
    };
  }
};
