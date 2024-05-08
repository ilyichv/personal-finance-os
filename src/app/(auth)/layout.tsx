import "~/styles/globals.css";

import { Sidebar } from "~/components/common/sidebar";
import { Header } from "~/components/common/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex min-h-screen flex-col">
        <Header />
        {children}
      </div>
    </main>
  );
}
