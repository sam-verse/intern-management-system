import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Users, Target, TrendingUp, Shield, Calendar, MessageSquare } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  imageUrl: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FEATURES: Feature[] = [
  {
    title: "Cohort & Department Management",
    description: "Group interns by cohort and department with unified context",
    imageUrl: "/images-hero/Cohort & Department.png",
    Icon: Users,
  },
  {
    title: "Tasks & Milestones",
    description: "Assign work, track progress, and celebrate achievements",
    imageUrl: "/images-hero/tasks.png",
    Icon: Target,
  },
  {
    title: "Program Analytics",
    description: "Dashboards for intern performance, engagement, and outcomes",
    imageUrl: "/images-hero/Program Analytics.png",
    Icon: TrendingUp,
  },
  {
    title: "Mentor Feedback",
    description: "Structured reviews, 1:1 notes, and continuous coaching",
    imageUrl: "/images-hero/Mentor Feedback.png",
    Icon: MessageSquare,
  },
  {
    title: "Schedules & Reminders",
    description: "Plan standups, evaluations, and deadlines with smart nudges",
    imageUrl: "/images-hero/Schedules & Reminders.png",
    Icon: Calendar,
  },
  {
    title: "Secure Roles & Access",
    description: "Granular permissions for admins, mentors, and interns",
    imageUrl: "/images-hero/Secure Roles.png",
    Icon: Shield,
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const { Icon } = feature;
  return (
    <div data-reveal className="relative rounded-md overflow-hidden shadow-xl aspect-[3/4]">
      <img src={feature.imageUrl} alt={feature.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/30" />
      <div className="absolute top-5 left-5 right-6">
        {/* <div className="mb-3 inline-flex items-center justify-center h-9 w-9 rounded-xl bg-white/90 dark:bg-black/60 backdrop-blur">
          <Icon className="h-5 w-5 text-primary" />
        </div> */}
        <h3 className="text-white text-xl drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' , fontWeight: '500'}}>{feature.title}</h3>
        <p className="mt-2 text-white/90 text-sm leading-snug drop-shadow-sm">{feature.description}</p>
      </div>
    </div>
  );
}

function FeaturesCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef<boolean>(false);

  useEffect(() => {
    const el = hoverRef.current;
    if (!el) return;
    const onEnter = () => {
      isHoveringRef.current = true;
    };
    const onLeave = () => {
      isHoveringRef.current = false;
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Auto-advance the carousel periodically; pauses on hover
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      if (!isHoveringRef.current) {
        api.scrollNext();
      }
    }, 2500);
    return () => clearInterval(id);
  }, [api]);

  // Duplicate items so the rail looks dense, similar to the screenshots
  const items = [...FEATURES, ...FEATURES, ...FEATURES];

  return (
    <section className="py-20 px-8 bg-muted/30" ref={hoverRef}>
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold text-foreground mb-12" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Everything You Need</h2>
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true, dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4" data-reveal-stagger>
              {items.map((feature, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-4 basis-[85%] sm:basis-[55%] md:basis-[45%] lg:basis-1/4"
                >
                  <FeatureCard feature={feature} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Hide manual controls to emphasize auto motion */}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
        <header className="bg-black/90 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/hf-logo-light.svg" alt="HappyFox" className="h-6 w-auto" />
            {/* <span className="text-xl font-bold text-background">HappyFox</span> */}
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-background hover:text-background/80 hover:bg-background/10">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary-hover" style={{ borderRadius: '4px' }}>
                Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

  {/* Hero Section */}
  <section className="pt-40 pb-40 px-8 bg-background">
    <div className="container mx-auto">
  <div className="flex flex-col md:flex-row items-center md:justify-center gap-12" style={{minHeight: '420px'}}>
  <div className="flex-1 max-w-3xl flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-5xl font-semibold text-foreground mb-6 leading-tight " style={{ fontFamily: 'Inter, sans-serif' , fontWeight: '500'}}>
            Intern Management<br />
            <span className="text-primary block mt-3">From Onboarding to Offer</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', fontSize: '18px', lineHeight: '1.6' }}>
            Streamline cohorts, projects, evaluations, and growth everything you need to run a
            high-impact internship program.
          </p>
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="sm" className="bg-primary hover:bg-primary-hover text-base px-5 py-5" style={{ borderRadius: '8px' }}>
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="text-base px-5 py-5" style={{ borderRadius: '8px' }}>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center w-full max-w-xl">
          <img
            src="/hero-img.png"
            alt="Internship program hero"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '420px', minWidth: '260px' }}
          />
        </div>
      </div>
    </div>
  </section>

      {/* Features Section - Carousel */}
      <FeaturesCarousel />

      {/* CTA Section */}
      <section className="py-20 px-8 bg-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '36px' }}>
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8" style={{ fontWeight: '300' }}>
            Transform your internship program today
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-lg px-10" style={{ borderRadius: '8px' }}>
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-8 bg-black/95">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/hf-logo-light.svg" alt="HappyFox" className="h-6 w-auto" />
              {/* <span className="font-bold text-foreground">HappyFox</span> */}
            </div>
            <div className="flex gap-6">
              <Link to="/login" className="text-sm text-white  hover:text-primary">Sign In</Link>
              <Link to="/register" className="text-sm text-white  hover:text-primary">Register</Link>
            </div>
          </div>
          <p className="text-xs  mt-6 text-white/50">
            © 2024 HappyFox. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
