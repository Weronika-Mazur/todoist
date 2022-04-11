export class FetchService {
  constructor(private readonly url: string) {}

  getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  get<B, T>(endpoint: string): Promise<T> {
    return this.client<B, T>("GET", endpoint);
  }

  post<B, T>(endpoint: string, body: B): Promise<T> {
    return this.client<B, T>("POST", endpoint, body);
  }

  put<B, T>(endpoint: string, body: B): Promise<T> {
    return this.client<B, T>("PUT", endpoint, body);
  }

  delete<B, T>(endpoint: string, body?: B): Promise<T> {
    return this.client<B, T>("DELETE", endpoint, body);
  }

  private async client<B, T>(
    method: string,
    endpoint: string,
    body?: B
  ): Promise<T> {
    const url = `${this.url}${endpoint}`;

    try {
      const data = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
          Authorization: this.getToken(),
        },
      });

      if (!data) {
        throw new Error("No data returned");
      }

      const response = await data.json();
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export const fetchService = new FetchService("http://localhost:3030/");
