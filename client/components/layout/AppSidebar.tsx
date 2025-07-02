import {
  Building2,
  Users,
  Clock,
  DollarSign,
  Calendar,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        roles: ["owner", "admin", "hr", "employee"],
      },
    ],
  },
  {
    title: "HR Management",
    items: [
      {
        title: "Employees",
        url: "/employees",
        icon: Users,
        roles: ["owner", "admin", "hr"],
      },
      {
        title: "Attendance",
        url: "/attendance",
        icon: Clock,
        roles: ["owner", "admin", "hr"],
      },
      {
        title: "Salary",
        url: "/salary",
        icon: DollarSign,
        roles: ["owner", "admin", "hr"],
      },
      {
        title: "Leave Requests",
        url: "/leave",
        icon: Calendar,
        roles: ["owner", "admin", "hr"],
      },
    ],
  },
  {
    title: "Employee Portal",
    items: [
      {
        title: "My Profile",
        url: "/profile",
        icon: UserCheck,
        roles: ["employee"],
      },
      {
        title: "My Attendance",
        url: "/my-attendance",
        icon: Clock,
        roles: ["employee"],
      },
      {
        title: "My Salary",
        url: "/my-salary",
        icon: DollarSign,
        roles: ["employee"],
      },
      {
        title: "Apply Leave",
        url: "/apply-leave",
        icon: Calendar,
        roles: ["employee"],
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Companies",
        url: "/companies",
        icon: Building2,
        roles: ["owner"],
      },
      {
        title: "Reports",
        url: "/reports",
        icon: BarChart3,
        roles: ["owner", "admin", "hr"],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        roles: ["owner", "admin"],
      },
    ],
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getVisibleItems = () => {
    return navigationItems
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => user && item.roles.includes(user.role),
        ),
      }))
      .filter((group) => group.items.length > 0);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">
              HRMS Pro
            </h1>
            <p className="text-sm text-sidebar-foreground/70">HR Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        {getVisibleItems().map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      className="w-full"
                    >
                      <Link
                        to={item.url}
                        className="flex items-center space-x-3 p-3 rounded-lg"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
