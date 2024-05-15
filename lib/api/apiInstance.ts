"use server";

import { validateRequest } from "../auth/lucia";

interface UseFetchProps {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "OPTION";
  headers: HeadersInit & {
    [key: string]: any;
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
  let fetching: Response | undefined = undefined;

  try {
    fetching = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEV_URL}${props.url}`,
      {
        method: props.method,
        headers: !!props.headers.authorization
          ? {
              ...props.headers,
              Authorization: `Bearer ${user?.token}`,
            }
          : {
              ...props.headers,
            },
        ...props.otherOption,
      }
    );
    const result = await fetching.json();
    return {
      data: result,
      status: fetching.status,
      isSuccess: fetching.ok ? true : false,
    };
  } catch (error) {
    return {
      data: JSON.stringify(error),
      status: !!fetching?.status ? fetching.status : 500,
      isSuccess: fetching?.ok ? true : false,
    };
  }
};
