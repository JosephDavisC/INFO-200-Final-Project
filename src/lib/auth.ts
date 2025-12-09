/**
 * Simple localStorage-based auth for testing
 * This will be replaced with real authentication later
 */

export interface User {
  fullName: string;
  email: string;
  institution?: string;
  major?: string;
  graduationYear?: string;
  studentId?: string;
}

const USER_KEY = "uw_transfer_user";
const AUTH_KEY = "uw_transfer_auth";

export function saveUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_KEY, "true");
  }
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function updateUser(updates: Partial<User>): void {
  const currentUser = getUser();
  if (currentUser) {
    saveUser({ ...currentUser, ...updates });
  }
}

export function isLoggedIn(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_KEY) === "true";
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_KEY);
  }
}

export function clearAllData(): void {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}
