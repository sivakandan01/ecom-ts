import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { NavUser } from "../nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Menu items.
const items = [
    {
        title: "Main",
        url: "/main",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "/home",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "/offer",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "/search",
        icon: Search,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export type userData = {
    id: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    companyName: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
};

const AppSidebar = () => {
    const { userData } = useSelector((state: RootState) => state.user);
    const [activeTab, setActiveTab] = useState<string>('main')

    const location = useLocation()

    useEffect(() => {
        setActiveTab(location.pathname)
    },[activeTab, location.pathname])

    const userWithAvatar: userData = {
        ...userData,
        avatar: "/src/assets/shdcn.jpg",
    };

    return (
        <div className="">
            <Sidebar collapsible="icon">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-2">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild className={`${activeTab === item.url ? "bg-gray-300 hover:bg-gray-200" : "hover:bg-gray-200"}`}>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={userWithAvatar} />
                </SidebarFooter>
            </Sidebar>
        </div>
    );
};

export { AppSidebar };
