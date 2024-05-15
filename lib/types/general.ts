export interface GeneralApiResponse<T> {
  data: T;
  status: number;
  isSuccess: boolean;
}
