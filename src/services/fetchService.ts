export class FetchService {
  constructor(private readonly url: string) {}

  getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  get<B, T>(endpoint: string, headers?: Headers): Promise<T> {
    return this.client<B, T>("GET", endpoint, undefined, headers);
  }

  post<B, T>(endpoint: string, body: B, headers?: Headers): Promise<T> {
    return this.client<B, T>("POST", endpoint, body, headers);
  }

  put<B, T>(endpoint: string, body: B, headers?: Headers): Promise<T> {
    return this.client<B, T>("PUT", endpoint, body, headers);
  }

  delete<B, T>(endpoint: string, body?: B, headers?: Headers): Promise<T> {
    return this.client<B, T>("DELETE", endpoint, body, headers);
  }

  private async client<B, T>(
    method: string,
    endpoint: string,
    body?: B,
    headers?: Headers
  ): Promise<T> {
    const url = `${this.url}${endpoint}`;

    const header = new Headers(headers);
    header.append("Authorization", this.getToken());

    const parsedBody = body instanceof FormData ? body : JSON.stringify(body);

    try {
      const data = await fetch(url, {
        method: method,
        body: parsedBody,
        headers: header,
      });

      if (!data) {
        throw new Error("No data returned");
      }

      if (!data.ok) {
        const text = await data.text();
        throw new Error(text);
      }

      const response = await data.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export const fetchService = new FetchService(
  "https://todoist-backend.fly.dev/"
);
