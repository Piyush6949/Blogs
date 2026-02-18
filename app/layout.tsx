import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { AppSidebar } from "@/components/web/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "YourBlogs",
  description: "Your personal blogging platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session_id")?.value);

  return (
    <html lang="en" className="dark">
      <body className="grid grid-rows-[auto_1fr] h-screen w-full overflow-hidden bg-background">

        <header className="flex h-14 items-center gap-2 border-b px-4 bg-background z-50">
          <h1 className="text-lg font-semibold tracking-tight">YourBlogs</h1>
          <Separator orientation="vertical" className="mx-2 h-4" />
        </header>

        <div className="min-h-0 min-w-0 overflow-visible">
          <SidebarProvider
            defaultOpen={false}
            className="h-full w-full dark"
          >
            <AppSidebar isLoggedIn={!!session} username={session?.username} />

            <SidebarInset className="h-full flex flex-col overflow-hidden">
              <SidebarTrigger className="-ml-1" />

              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </div>

      </body>
    </html>
  );
}