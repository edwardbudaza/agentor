import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/nextjs';
import { ArrowRight, Loader, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { features } from '@/constants';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <section className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-10 text-center relative z-10">
        {/* Hero content */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>

        <header className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Your AI Superpower
          </h1>
          <p className="max-w-[600px] text-lg md:text-xl/relaxed xl:text-2xl/relaxed text-muted-foreground">
            Transform the way you work with an AI assistant that doesn't just
            chat – it takes action.
            <br />
            <span className="text-sm text-muted-foreground/80">
              Leveraging IBM's WxTools & state-of-the-art LLMs for unprecedented
              capabilities
            </span>
          </p>
        </header>

        <ClerkLoading>
          <Loader className="animate-spin h-5 w-5 text-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <Link href="/dashboard">
              <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-primary-foreground bg-gradient-to-r from-primary to-primary/90 rounded-full hover:from-primary/90 hover:to-primary/80 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={'/dashboard'}
              forceRedirectUrl={'/dashboard'}
            >
              <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-primary-foreground bg-gradient-to-r from-primary to-primary/90 rounded-full hover:from-primary/90 hover:to-primary/80 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mg:gap-16 pt-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl transition-all duration-200 hover:-translate-y-1 bg-card hover:bg-card/80 shadow-lg hover:shadow-xl"
              >
                <Icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <div className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </div>
                <div className="text-sm mt-2 text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
