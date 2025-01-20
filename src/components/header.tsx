'use client';

import { Button } from '@/components/ui/button';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/clerk-react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Loader } from 'lucide-react';
import ModeToggle from './shared/mode-toggle';
import { use } from 'react';
import { NavigationContext } from '@/components/providers/navigation-provider';

export const Header = () => {
  const { setIsMobileNavOpen, isMobileNavOpen } = use(NavigationContext);
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden text-muted-foreground hover:text-foreground hover:bg-muted/20"
            aria-label="Toggle navigation menu"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
          </Button>
          {/* Branding */}
          <div className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Chat with an AI Agent
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ModeToggle />
          {/* Clerk Loading State */}
          <ClerkLoading>
            <Loader className="h-6 w-6 animate-spin text-muted" />
          </ClerkLoading>
          {/* User Button */}
          <ClerkLoaded>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    'h-8 w-8 ring-2 ring-border rounded-full transition-shadow hover:ring-muted',
                },
              }}
            />
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};
