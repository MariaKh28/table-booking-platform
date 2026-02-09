export function formatResponse(
  statusCode: number,
  message: string,
  data: any = null,
  error: any = null,
) {
  return {
    statusCode,
    message,
    data,
    error,
  };
}

