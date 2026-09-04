import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HitHappen",
    short_name: "HitHappen",
    description: "Scegli cosa fare stasera a Milano e Monza.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f4",
    theme_color: "#c32f27",
    orientation: "portrait",
    icons: [{ src: "/branding/logo.png", sizes: "any", type: "image/png", purpose: "maskable" }],
  };
}
