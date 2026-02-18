"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Info, PenSquare, LogOut, LogIn, UserPlus, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/logout";

const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "About", href: "/about", icon: Info },
    { title: "Create", href: "/create/new-story", icon: PenSquare },
    { title: "Stories", href: "/stories", icon: BookOpen },
];

export function AppSidebar({ isLoggedIn, username }: { isLoggedIn: boolean; username?: string }) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <Sidebar className="mt-14 h-[calc(100vh-56px)]">
            <SidebarHeader className="px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                    Menu
                </p>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={isActive(item.href)}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    {isLoggedIn ? (
                        <>
                            {/* User info */}
                            <SidebarMenuItem>
                                <div className="flex items-center gap-3 px-2 py-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chart-1 to-chart-4 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                        {username?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {username || "User"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Logged in</p>
                                    </div>
                                </div>
                            </SidebarMenuItem>

                            {/* Logout */}
                            <SidebarMenuItem>
                                <form action={logout}>
                                    <SidebarMenuButton type="submit" tooltip="Logout">
                                        <LogOut />
                                        <span>Logout</span>
                                    </SidebarMenuButton>
                                </form>
                            </SidebarMenuItem>
                        </>
                    ) : (
                        <>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Sign Up">
                                    <Link
                                        href="/signup"
                                        className="bg-primary text-primary-foreground hover:opacity-90"
                                    >
                                        <UserPlus />
                                        <span>Sign Up</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Login">
                                    <Link href="/signin">
                                        <LogIn />
                                        <span>Login</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </>
                    )}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
