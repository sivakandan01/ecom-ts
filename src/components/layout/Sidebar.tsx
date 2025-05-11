import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { NavUser } from "../nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
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
  avatar: string
};


const AppSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.user)

  const userWithAvatar: userData = {
    ...userData,
    avatar: "/src/assets/shdcn.jpg"
  }

  return (
    <div className="">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
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
                <NavUser user={userWithAvatar}/>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export { AppSidebar };
