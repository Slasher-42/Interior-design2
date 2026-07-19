import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "./authIcons";

const NAV_LINKS = [
  { to: "/portfolio", key: "topbar.portfolio" },
  { to: "/services", key: "topbar.services" },
  { to: "/about", key: "topbar.about" },
  { to: "/contact", key: "topbar.contact" },
  { to: "/request", key: "topbar.request" },
];

export function AuthHeader({ authLinkTo = "/portal/login", authLinkLabel }) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    navigate(query.trim() ? `/portfolio?q=${encodeURIComponent(query.trim())}` : "/portfolio");
  }

  return (
    <header className="auth-topbar">
      <div className="auth-topbar__inner">
        <Link to="/" className="auth-topbar__brand">
          {t("sidePanel.brandName")}
        </Link>

        <nav className="auth-topbar__nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="auth-topbar__right">
          <Link to={authLinkTo} className="auth-topbar__signin">
            {authLinkLabel || t("topbar.signIn")}
          </Link>

          <form className="auth-topbar__search" onSubmit={handleSearch} role="search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("topbar.searchPlaceholder")}
              aria-label={t("topbar.searchPlaceholder")}
            />
            <button type="submit" aria-label={t("topbar.search")}>
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
