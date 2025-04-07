import { Path } from "../router/routes";

export class ApiService {
  static async request<T, Body = unknown>(
    url: string,
    method: string,
    body?: Body,
  ): Promise<T> {
    const API_URL = import.meta.env.VITE_API_URI ?? "http://localhost:3000/api";

    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: this.generateHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      this.handleStatuses(response.status);

      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    return response.json() as Promise<T>;
  }

  private static handleStatuses(status: number) {
    switch (status) {
      case 401:
        sessionStorage.clear();
        if (window.location.pathname !== Path.SignIn)
          window.location.href = Path.SignIn;

        break;
      case 404:
        window.location.href = Path.NotFound;

        break;
      default:
        break;
    }
  }

  private static generateHeaders() {
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("access_token")
        : null;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  static get<T>(url: string): Promise<T> {
    return this.request<T>(url, "GET");
  }

  static post<T, Body>(url: string, body: Body): Promise<T> {
    return this.request<T, Body>(url, "POST", body);
  }

  static put<T, Body>(url: string, body: Body): Promise<T> {
    return this.request<T, Body>(url, "PUT", body);
  }

  static patch<T, Body>(url: string, body: Body): Promise<T> {
    return this.request<T, Body>(url, "PATCH", body);
  }

  static delete<T>(url: string): Promise<T> {
    return this.request<T>(url, "DELETE");
  }
}

export default ApiService;
