import { useAuth } from "../portal/auth/AuthContext";

/**
 * Destination for the "request a service" / "start a project" CTAs.
 * - A signed-in CLIENT goes straight to their requests page.
 * - Everyone else (not signed in, or signed in with another role) is sent to
 *   sign in first, so they proceed as a client.
 */
export function useRequestLink() {
  const { user } = useAuth();
  if (user && user.role === "CLIENT") {
    return "/portal/requests";
  }
  return "/portal/login";
}
