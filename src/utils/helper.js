import { subDomainList } from "./constant";

export const getApps = () => {
  const subdomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app) => app.main);
  if (subdomain === "") return mainApp.app;

  const apps = subDomainList.find((app) => subdomain === app.subdomain);
  return apps ? apps.app : mainApp.app;
};

export const getSubDomain = (hostname) => {
  const parts = hostname.split(".");

  // Localhost → no subdomain
  if (parts[0] === "localhost") return "";

  // Netlify hosted apps → <site>.netlify.app (not a subdomain)
  if (parts.includes("netlify") && parts.includes("app")) {
    return "";
  }

  // Custom domain with subdomain: sub.domain.com
  if (parts.length > 2) {
    return parts.slice(0, parts.length - 2).join(".");
  }

  // Default → no subdomain
  return "";
};