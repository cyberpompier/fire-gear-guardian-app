
import { useState } from "react";
import { 
  activity, 
  shield, 
  users, 
  settings, 
  archive, 
  bell,
  monitor
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { 
    title: "Tableau de bord", 
    url: "/", 
    icon: monitor,
    description: "Vue d'ensemble"
  },
  { 
    title: "Gestion EPI", 
    url: "/epi", 
    icon: shield,
    description: "Équipements de protection"
  },
  { 
    title: "Personnel", 
    url: "/personnel", 
    icon: users,
    description: "Sapeurs-pompiers"
  },
  { 
    title: "Vérifications", 
    url: "/verifications", 
    icon: activity,
    description: "Contrôles périodiques"
  },
  { 
    title: "Alertes", 
    url: "/alertes", 
    icon: bell,
    description: "Notifications"
  },
  { 
    title: "Archives", 
    url: "/archives", 
    icon: archive,
    description: "Historique"
  },
  { 
    title: "Paramètres", 
    url: "/settings", 
    icon: settings,
    description: "Configuration"
  },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary text-primary-foreground font-medium hover:bg-primary/90" 
      : "hover:bg-accent hover:text-accent-foreground";
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300 border-r border-border/50 bg-sidebar`}
      collapsible
    >
      <SidebarContent className="bg-gradient-to-b from-sidebar to-sidebar/80">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <h1 className="font-bold text-sidebar-foreground">EPI Manager</h1>
                <p className="text-xs text-sidebar-foreground/70">Sapeurs-Pompiers</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 mb-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`${getNavClasses(item.url)} flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium truncate">{item.title}</span>
                          <span className="text-xs opacity-70 truncate">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status indicator */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Système opérationnel
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
