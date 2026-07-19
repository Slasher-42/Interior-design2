import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./auth/AuthContext";
import { ROLE_DEFAULT_ROUTE } from "./auth/roles";
import { EyeIcon, EyeOffIcon } from "./authIcons";
import { OtpStep } from "./OtpStep";
import { AuthHeader } from "./AuthHeader";
import { SocialAuthRow } from "./SocialAuthRow";
import { useToast } from "../components/toast/ToastContext";
import "./PortalLogin.css";

// Must match the message AuthService.registerFromGoogle throws in the backend
// when a brand-new Google account signs in without a role.
const GOOGLE_ROLE_REQUIRED_MESSAGE = "Choose whether you are a client or a designer to finish signing up.";

export function PortalLogin() {
  const { t } = useTranslation("auth");
  const { login, verifyOtp, loginWithGoogle, loading, error, clearError } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [googleIdToken, setGoogleIdToken] = useState(null);
  const [googleRole, setGoogleRole] = useState("CLIENT");
  const GOOGLE_ROLES = [
    { value: "CLIENT", label: t("register.roles.client") },
    { value: "STAFF", label: t("register.roles.designer") },
  ];

  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToDashboard(role) {
    const route = ROLE_DEFAULT_ROUTE[role] || "/portal/clients";
    navigate(route, { replace: true });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await login(form.email, form.password);
      if (result.otpRequired) {
        setPendingEmail(result.email);
      } else {
        showSuccess(t("login.welcomeBackToast"));
        goToDashboard(result.role);
      }
    } catch (err) {
      showError(err.message || t("login.errorFallback"));
    }
  }

  async function handleVerify(code) {
    try {
      const user = await verifyOtp(pendingEmail, code);
      showSuccess(t("login.welcomeBackToast"));
      goToDashboard(user.role);
    } catch (err) {
      showError(err.message || t("login.verifyErrorFallback"));
    }
  }

  async function handleGoogleRoleSubmit() {
    try {
      const user = await loginWithGoogle(googleIdToken, googleRole);
      showSuccess(t("register.successToast"));
      goToDashboard(user.role);
    } catch (err) {
      showError(err.message || t("login.errorFallback"));
      setGoogleIdToken(null);
    }
  }

  function handleGoogleError(message, idToken) {
    if (message === GOOGLE_ROLE_REQUIRED_MESSAGE && idToken) {
      setGoogleIdToken(idToken);
    } else {
      showError(message);
    }
  }

  return (
    <div className="auth-page">
      <AuthHeader authLinkTo="/portal/register" authLinkLabel={t("register.bigTitle")} />

      <div className="auth-page__content">
        <div className="auth-card">
          {pendingEmail ? (
            <OtpStep
              email={pendingEmail}
              loading={loading}
              error={error}
              onVerify={handleVerify}
              onBack={() => {
                clearError();
                setPendingEmail(null);
              }}
            />
          ) : googleIdToken ? (
            <>
              <h2 className="auth-card__title">{t("login.googleRoleTitle")}</h2>
              <p className="auth-card__sub">{t("login.googleRoleSubtitle")}</p>

              <div className="auth-field" style={{ marginTop: "1.6rem" }}>
                <div
                  className="auth-role-group"
                  role="radiogroup"
                  aria-label={t("register.registeringAs")}
                >
                  {GOOGLE_ROLES.map((r) => (
                    <label
                      key={r.value}
                      className={"auth-role-option" + (googleRole === r.value ? " is-selected" : "")}
                    >
                      <input
                        type="radio"
                        name="googleRole"
                        value={r.value}
                        checked={googleRole === r.value}
                        onChange={(e) => setGoogleRole(e.target.value)}
                      />
                      <span className="auth-role-option__label">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="auth-form__submit"
                disabled={loading}
                onClick={handleGoogleRoleSubmit}
                style={{ marginTop: "1.6rem" }}
              >
                {loading ? t("login.signingIn") : t("login.googleRoleContinue")}
              </button>

              <p className="auth-card__switch">
                <button
                  type="button"
                  className="auth-card__link-btn"
                  onClick={() => setGoogleIdToken(null)}
                >
                  {t("login.googleRoleCancel")}
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="auth-card__title">{t("login.bigTitle")}</h2>

              <SocialAuthRow
                onSuccess={(user) => {
                  showSuccess(t("login.welcomeBackToast"));
                  goToDashboard(user.role);
                }}
                onError={handleGoogleError}
                onUnavailable={(provider) =>
                  showError(t("social.unavailable", { provider }))
                }
              />

              <div className="auth-divider">{t("social.orSignInEmail")}</div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {error && <p className="auth-form__error">{error}</p>}

                <div className="auth-field">
                  <label htmlFor="email">{t("login.emailLabel")}</label>
                  <div className="auth-input">
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t("login.emailLabel")}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="password">{t("login.passwordLabel")}</label>
                  <div className="auth-input">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder={t("login.passwordLabel")}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-input__toggle"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? t("login.hidePassword") : t("login.showPassword")}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <div className="auth-field__row">
                    <Link to="/portal/forgot-password" className="auth-field__forgot">
                      {t("login.forgotPassword")}
                    </Link>
                  </div>
                </div>

                <button type="submit" className="auth-form__submit" disabled={loading}>
                  {loading ? t("login.signingIn") : t("login.signInButton")}
                </button>
              </form>

              <p className="auth-card__switch">
                {t("login.noAccount")}{" "}
                <Link to="/portal/register" className="auth-card__link">
                  {t("login.createAccount")}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
