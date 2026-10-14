import type { Metadata } from "next";
import Header from "@/components/Header";
import { asset } from "@/lib/paths";
import { profile } from "@/content/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description: profile.role,
  icons: {
    icon: [
      { url: asset("favicon.ico"), sizes: "any" },
      { url: asset("favicon.svg"), type: "image/svg+xml" },
    ],
    apple: asset("apple-touch-icon.png"),
  },
  manifest: asset("site.webmanifest"),
};

// Applies the saved or system theme before first paint, so the page doesn't flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
