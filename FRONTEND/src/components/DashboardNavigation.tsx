import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Settings, 
  LogOut, 
  Bell,
  Menu,
  X
} from "lucide-react";

interface DashboardNavigationProps {
  userRole: "admin" | "intern";
}

export const DashboardNavigation = ({ userRole }: DashboardNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const userEmail = localStorage.getItem("userEmail") || "";
  const userName = localStorage.getItem("userName") || userEmail.split("@")[0];
  
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderOpen },
    { name: "Interns", href: "/admin/interns", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const internNavItems = [
    { name: "Dashboard", href: "/intern", icon: LayoutDashboard },
    { name: "My Projects", href: "/intern/projects", icon: FolderOpen },
    { name: "Progress", href: "/intern/progress", icon: Users },
    { name: "Settings", href: "/intern/settings", icon: Settings },
  ];

  const navItems = userRole === "admin" ? adminNavItems : internNavItems;
  
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/90 border-b border-border/40 sticky top-0 z-50 shadow-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
      <div className="container mx-auto px-6 max-w-7xl">
  <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-8 w-8" />
            <Badge variant="outline" className="hidden sm:inline-flex text-xs font-medium border-orange-500 text-orange-500 bg-transparent">
              {userRole === "admin" ? "Admin" : "Intern"}
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActivePath(item.href)
                    ? 'text-orange-500 bg-white/10 shadow-sm'
                    : 'text-white hover:text-orange-500 hover:bg-white/10'
                }`}
              >
                {/* <item.icon className="h-4 w-4" /> */}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-white hover:text-orange-500">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium text-white">
                    {userName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/95 text-white border border-border/40">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${userRole}/settings`)} className="text-white hover:text-orange-500">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-orange-500 hover:bg-orange-500/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-orange-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-black/95">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActivePath(item.href)
                      ? 'text-orange-500 bg-white/10'
                      : 'text-white hover:text-orange-500 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
