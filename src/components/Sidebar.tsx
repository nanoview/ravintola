
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  User,
  PlusCircle,
  Home
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/posts', label: 'Posts', icon: <FileText size={20} /> },
    { path: '/media', label: 'Media', icon: <Image size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="h-full bg-sidebar fixed top-0 left-0 bottom-0 z-20">
      <div className={`h-14 flex items-center ${collapsed ? 'justify-center' : 'px-4'} border-b border-sidebar-border`}>
        {collapsed ? (
          <Home size={24} className="text-sidebar-foreground" />
        ) : (
          <div className="flex items-center text-sidebar-foreground font-medium text-lg">
            <Home size={24} className="mr-2" />
            <span>ContentVerse</span>
          </div>
        )}
      </div>
      <nav className="p-2">
        <div className="mb-4">
          <Button 
            variant="default" 
            size={collapsed ? "icon" : "default"} 
            className={`w-full bg-sidebar-primary hover:bg-sidebar-primary/90 mb-2 ${collapsed ? 'justify-center p-2' : ''}`}
            asChild
          >
            <Link to="/editor">
              <PlusCircle size={20} className={collapsed ? '' : 'mr-2'} />
              {!collapsed && <span>New Post</span>}
            </Link>
          </Button>
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "default"}
                className={`w-full justify-${collapsed ? 'center' : 'start'} ${
                  isActive(item.path)
                    ? 'bg-sidebar-accent text-sidebar-foreground'
                    : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
                asChild
              >
                <Link to={item.path}>
                  <span className={collapsed ? '' : 'mr-2'}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
