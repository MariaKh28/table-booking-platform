export interface ProviderError {
  provider: string;
  message: string;
}

export interface IApiResponseSuccess<T> {
  data: T;
  message: string;
  statusCode: number;
  error: ProviderError[] | null;
}

export interface IApiResponseReject {
  data: null;
  message: string;
  statusCode: number;
  error: string;
}
