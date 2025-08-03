import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
