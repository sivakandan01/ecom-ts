"use client"

import {
  CircleUserRound,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { userData } from "../layout/Sidebar"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { setUser } from "@/store/slice/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

type NavUserProps = {
  user: userData;
};

const NavUser = ({ user }: NavUserProps ) => {

  const { isMobile } = useSidebar()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isCompany, setIsCompany] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    if(user.role === "company"){
      setIsCompany(true)
    } else if (user.role === "admin"){
      setIsAdmin(true)
    }
  },[user.role])

  const Logout = () => {
    dispatch(setUser({}))
    navigate("/login")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.userName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.userName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.userName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.userName}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <CircleUserRound />
              Profile
            </DropdownMenuItem>
            {isCompany && <DropdownMenuItem onClick={() => navigate("/company")}>
              <CircleUserRound />
              Company
            </DropdownMenuItem>}
            {isAdmin && <DropdownMenuItem  onClick={() => navigate("/admin")}>
              <CircleUserRound />
              Admin
            </DropdownMenuItem>}
            <DropdownMenuItem onClick={Logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export { NavUser }