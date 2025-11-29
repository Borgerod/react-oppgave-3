import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React Oppgave 3 - Context API",
  description: "ToDoApp and ThemeSwitcher using React Context API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
