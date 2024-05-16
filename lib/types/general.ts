export interface GeneralApiResponse<T> {
  data: T;
  status: number;
  isSuccess: boolean;
}

export interface Data {
  [key: string]: any;
}
