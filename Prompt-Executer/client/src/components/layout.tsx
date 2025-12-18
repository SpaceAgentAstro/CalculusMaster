import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Settings, 
  LogOut,
  Menu,
  ShieldCheck,
  Brain,
  Users,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logoImg from "@assets/generated_images/glowing_geometric_hexagon_logo.png";

export default function Layout({ children, showNav = true }: { children: React.ReactNode; showNav?: boolean }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ShieldCheck, label: "Workbench", href: "/workbench" },
    { icon: Users, label: "Classes", href: "/teacher" },
    { icon: Users, label: "Admin", href: "/admin" },
    { icon: Gamepad2, label: "Games", href: "/games" },
    { icon: Brain, label: "Tutor", href: "/tutor" },
    { icon: Trophy, label: "Exams", href: "/exams" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border/50 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
        <div className="relative w-10 h-10">
           <img src={logoImg} className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" alt="Galactic Calculus" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-primary tracking-wider">GALACTIC</h1>
          <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">Calculus</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer",
              location === item.href 
                ? "bg-sidebar-accent text-primary shadow-[0_0_15px_rgba(0,255,255,0.15)] border border-primary/20" 
                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
            )}>
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                location === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent/30 border border-sidebar-border/30">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-bold text-background">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">Alex Chen</p>
            <p className="text-xs text-primary truncate">Level 42 Architect</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Mobile Nav */}
      {showNav && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-2">
            <img src={logoImg} className="w-8 h-8" alt="Logo" />
            <span className="font-display font-bold text-primary">GALACTIC</span>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 border-r border-sidebar-border bg-sidebar">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Desktop Sidebar */}
      {showNav && (
        <div className="hidden md:block w-72 flex-shrink-0 z-20">
          <NavContent />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto pt-20 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
