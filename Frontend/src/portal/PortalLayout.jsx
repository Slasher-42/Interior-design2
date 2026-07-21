import { Outlet, Navigate, useNavigate, NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { NAV_ICONS, HomeIcon, UserCircleIcon } from "./navIcons";
import { PortalHeader } from "./PortalHeader";
import { useToast } from "../components/toast/ToastContext";
import "./PortalLayout.css";

const ROLE_MENUS = {
  CLIENT: [
    { to: "dashboard",     key: "nav.dashboard" },
    { to: "requests",      key: "nav.myRequests" },
    { to: "assessments",   key: "nav.assessments" },
    { to: "account",       key: "nav.account" },
    { to: "quotations",    key: "nav.myQuotations" },
    { to: "projects",      key: "nav.myProjects" },
    { to: "feedback",      key: "nav.feedback" },
    { to: "notifications", key: "nav.notifications" },
  ],
  STAFF: [
    { to: "dashboard",                key: "nav.dashboard" },
    { to: "professional-background",  key: "nav.professionalBackground" },
    { to: "staff",                    key: "nav.staff" },
    { to: "tasks",                    key: "nav.myTasks" },
    { to: "projects",                 key: "nav.projects" },
    { to: "design-files",             key: "nav.designFiles" },
    { to: "account",                  key: "nav.account" },
    { to: "notifications",            key: "nav.notifications" },
  ],
  PROJECT_MANAGER: [
    { to: "requests",         key: "nav.serviceRequests" },
    { to: "quotations",       key: "nav.quotations" },
    { to: "projects",         key: "nav.projectManagement" },
    { to: "designer-monitor", key: "nav.designerMonitor" },
    { to: "tasks",            key: "nav.tasksAndResources" },
    { to: "design-files",     key: "nav.designPortfolio" },
    { to: "compensation",     key: "nav.compensation" },
    { to: "notifications",    key: "nav.notifications" },
  ],
  ADMIN: [
    { to: "clients",          key: "nav.userManagement" },
    { to: "requests",         key: "nav.serviceRequests" },
    { to: "quotations",       key: "nav.quotations" },
    { to: "projects",         key: "nav.projectManagement" },
    { to: "designer-monitor", key: "nav.designerMonitor" },
    { to: "design-files",     key: "nav.portfolio" },
    { to: "analytics",        key: "nav.analyticsDashboard" },
    { to: "reports",          key: "nav.reports" },
    { to: "notifications",    key: "nav.notifications" },
    { to: "security",         key: "nav.securityAndAccess" },
  ],
};

const ROLE_LABEL_KEYS = {
  CLIENT:          "role.client",
  STAFF:           "role.designer",
  PROJECT_MANAGER: "role.projectManager",
  ADMIN:           "role.administrator",
};

export function PortalLayout() {
  const { t } = useTranslation("portal");
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/portal/login" replace />;

  const menu = ROLE_MENUS[user.role] || ROLE_MENUS.CLIENT;
  const roleLabel = t(ROLE_LABEL_KEYS[user.role] || "role.client", { defaultValue: user.role });

  function handleLogout() {
    logout();
    showSuccess(t("sidebar.loggedOut"));
    navigate("/portal/login", { replace: true });
  }

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="portal-sidebar__header">
          <span className="portal-sidebar__brand">Space Design Group</span>
          <span className="portal-sidebar__sub">{t("sidebar.managementPortal")}</span>
        </div>

        <div className="portal-sidebar__toolbar">
          <Link to="/" className="portal-sidebar__tool" title={t("sidebar.backToWebsite")} aria-label={t("sidebar.backToWebsite")}>
            <HomeIcon />
          </Link>
          <Link to="profile" className="portal-sidebar__tool" title={t("sidebar.editProfile")} aria-label={t("sidebar.editProfile")}>
            <UserCircleIcon />
          </Link>

          <div className="portal-sidebar__spacer" />
        </div>

        <nav className="portal-sidebar__nav" aria-label="Portal modules">
          <ul>
            {menu.map((item) => {
              const ItemIcon = NAV_ICONS[item.to];
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      "portal-sidebar__link" + (isActive ? " is-active" : "")
                    }
                  >
                    {ItemIcon && (
                      <span className="portal-sidebar__link-icon">
                        <ItemIcon />
                      </span>
                    )}
                    <span>{t(item.key)}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="portal-sidebar__footer">
          <div className="portal-sidebar__user">
            <span className="portal-sidebar__user-name">
              {user.fullName || user.email}
            </span>
            <span className="portal-sidebar__user-role">{roleLabel}</span>
          </div>
          <button type="button" className="portal-sidebar__logout" onClick={handleLogout}>
            {t("sidebar.signOut")}
          </button>
        </div>
      </aside>

      <main className="portal-content">
        <PortalHeader user={user} roleLabel={roleLabel} theme={theme} onToggleTheme={toggleTheme} />
        <Outlet />
      </main>
    </div>
  );
}
