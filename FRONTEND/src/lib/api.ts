export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  const token = getAccessToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export async function login(email: string, password: string) {
  // Backend uses username by default; accept email as username for demo
  const username = email.split("@")[0];
  const data = await apiFetch<{ access: string; refresh: string }>(
    "/auth/token/",
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }
  );
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  const me = await apiFetch<CurrentUser>("/auth/me/");
  localStorage.setItem("userRole", me.role);
  localStorage.setItem("userEmail", me.email || "");
  return me;
}

export async function register(payload: {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role: "admin" | "intern";
}) {
  await apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  // auto login
  return login(payload.email, payload.password);
}

export type CurrentUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "intern";
};

export type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  due_date: string | null;
  interns: Array<CurrentUser>;
  created_at: string;
  updated_at: string;
};

export async function listProjects(params?: { status?: string; search?: string }) {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.search) qs.set("search", params.search);
  const q = qs.toString() ? `?${qs.toString()}` : "";
  return apiFetch<Project[]>(`/projects/${q}`);
}

export async function createProject(payload: {
  title: string;
  description?: string;
  status?: string;
  progress?: number;
  due_date?: string | null;
  intern_ids?: number[];
}) {
  return apiFetch<Project>("/projects/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listUsers() {
  return apiFetch<CurrentUser[]>("/users/");
}


