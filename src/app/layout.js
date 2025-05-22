import "./globals.css";
import Header from "@/components/Header.js";

export const metadata = {
  title: "DevOlve Studio",
  description: "Crafted by TheAstronautGuy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header />
        {children}
      </body>
    </html>
  );
}