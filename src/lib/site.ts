export const book = {
  title: "Beyond the Echoes of Black History",
  subtitle: "Great Black Inventions",
  author: "James E. Craver",
  description: "A historical record of Black American innovation, invention, scientific achievement, engineering, and perseverance across generations.",
  price: null as number | null,
  currency: null as string | null,
  salesEmail: "sales@[author-domain].com",
};

export const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/book", label: "The Book" },
  { to: "/author", label: "The Author" },
  { to: "/inventors", label: "Inventors" },
  { to: "/timeline", label: "Timeline" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export const bookDescription = "Explore the documented stories of Black American invention, engineering, science, and innovation collected in Beyond the Echoes of Black History.";
