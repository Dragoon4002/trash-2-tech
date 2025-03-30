
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Home, Clock, Settings, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Navigation items array defined outside of the component
const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/history', label: 'History', icon: Clock },
  { path: '/profile', label: 'Settings', icon: Settings },
];

// Mobile navigation component defined outside the main component
const MobileNavigation = ({ signOut, location }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="py-4">
      <div className="flex flex-col space-y-3 px-4">
        {navigationItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            size="sm"
            className="justify-start"
            asChild
          >
            <Link to={item.path} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
        <Button
          variant="destructive"
          size="sm"
          className="justify-start mt-4"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign out</span>
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Trash 2 Tech</span>
          </Link>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-3">
            <MobileNavigation signOut={signOut} location={location} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link to={item.path} className="flex items-center gap-1">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full" size="icon">
                    <Avatar>
                      <AvatarImage src={user.photoURL} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
