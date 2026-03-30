export class ApiResponse<T = unknown> {
  public success: boolean;
  public message: string;
  public data: T | null;
  public meta?: Record<string, unknown>;

  private constructor(
    success: boolean,
    message: string,
    data: T | null = null,
    meta?: Record<string, unknown>
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    if (meta) {
      this.meta = meta;
    }
  }

  static success<T>(
    data: T | null = null,
    message = 'Success',
    meta?: Record<string, unknown>
  ): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data, meta);
  }

  static error<T>(
    message = 'An error occurred',
    data: T | null = null
  ): ApiResponse<T> {
    return new ApiResponse<T>(false, message, data);
  }
}