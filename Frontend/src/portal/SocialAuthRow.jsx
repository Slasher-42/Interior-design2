import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./auth/AuthContext";
import { FacebookIcon, XIcon, GoogleIcon } from "./authIcons";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Genius-style row of three social sign-in pills (Facebook, X, Google).
 * Only Google is wired to the backend; Facebook and X report as unavailable
 * so nothing silently fails.
 */
export function SocialAuthRow({ role, onSuccess, onError, onUnavailable }) {
  const { t } = useTranslation("auth");
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    if (!CLIENT_ID || !window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: async (response) => {
        try {
          const user = await loginWithGoogle(response.credential, role);
          onSuccess?.(user);
        } catch (err) {
          onError?.(err.message || t("google.signInFailed"), response.credential);
        }
      },
    });
  }, [role]);

  function handleGoogle() {
    if (!CLIENT_ID || !window.google?.accounts?.id) {
      onUnavailable?.("Google");
      return;
    }
    window.google.accounts.id.prompt();
  }

  return (
    <div className="auth-social">
      <button
        type="button"
        className="auth-social__btn"
        onClick={() => onUnavailable?.("Facebook")}
        aria-label={t("social.facebook")}
      >
        <FacebookIcon />
      </button>
      <button
        type="button"
        className="auth-social__btn"
        onClick={() => onUnavailable?.("X")}
        aria-label={t("social.x")}
      >
        <XIcon />
      </button>
      <button
        type="button"
        className="auth-social__btn"
        onClick={handleGoogle}
        aria-label={t("social.google")}
      >
        <GoogleIcon />
      </button>
    </div>
  );
}
