import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Users, LayoutDashboard, Briefcase, UserCheck } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHRDashboard = location.pathname.startsWith('/hr');
  const isOnboarding = location.pathname === '/onboarding';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <Rocket className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">Space42</span>
        </Link>

        <nav className="flex items-center gap-2">
          {isHRDashboard ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/hr">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <Briefcase className="h-4 w-4" />
                  Careers
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <Briefcase className="h-4 w-4" />
                  Careers
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/onboarding">
                  <UserCheck className="h-4 w-4" />
                  New Hire
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/hr">
                  <Users className="h-4 w-4" />
                  HR Portal
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
