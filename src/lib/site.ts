/**
 * The studio's details and the site's routes, shared by the nav, the footer
 * and every page.
 */

export const EMAIL = "bilal.moubarak@gmail.com";

// Taken from the demo design. Confirm with the studio before launch.
export const PHONE = { display: "+961 3 273 914", href: "tel:+9613273914" };

// TODO: replace "#" with the studio's profile URLs. A link left as "#"
// renders as an icon that goes nowhere when clicked.
export const SOCIAL = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "LinkedIn", href: "#" },
] as const;

export type SocialName = (typeof SOCIAL)[number]["name"];

export const COORDS = "33.8886° N · 35.4955° E";

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  projects: "/projects",
  process: "/process",
  contact: "/contact",
} as const;
