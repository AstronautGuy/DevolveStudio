import "./globals.css";

export const metadata = {
  title: "DevOlve Studio",
  description: "Crafted by TheAstronautGuy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}