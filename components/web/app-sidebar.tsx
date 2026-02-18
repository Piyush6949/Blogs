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
} from "@/components/ui/sidebar";
import { Home, Info, PenSquare, LogOut, LogIn, UserPlus, BookOpen } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/logout";

const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "About", href: "/about", icon: Info },
    { title: "Create", href: "/create/new-story", icon: PenSquare },
    { title: "Stories", href: "/stories", icon: BookOpen }
];

export function AppSidebar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <Sidebar className="mt-14 h-[calc(100vh-56px)]">
            <SidebarHeader>
                {/* <h1 className="px-2 text-xl font-bold">YourBlogs</h1> */}
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
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
                <SidebarMenu>
                    {isLoggedIn ? (
                        <SidebarMenuItem>
                            <form action={logout}>
                                <SidebarMenuButton type="submit" tooltip="Logout">
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </form>
                        </SidebarMenuItem>
                    ) : (
                        <>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Sign Up">
                                    <Link href="/signup">
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
