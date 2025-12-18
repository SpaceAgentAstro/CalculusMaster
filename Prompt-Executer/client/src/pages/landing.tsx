import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Lock, ShieldCheck, User, Users, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";
import bgImage from "@assets/generated_images/deep_space_nebula_background_with_geometric_constellations.png";
import logoImg from "@assets/generated_images/glowing_geometric_hexagon_logo.png";

export default function Landing() {
  const [_, setLocation] = useLocation();

  const handleLogin = () => {
    setLocation("/placement");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} className="w-full h-full object-cover opacity-80" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 items-center">
        {/* Left Column: Hero Text */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-10 duration-700">
            <img src={logoImg} className="w-20 h-20 drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]" alt="Logo" />
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary tracking-tight">
                GALACTIC
              </h1>
              <p className="text-2xl font-light tracking-[0.3em] text-primary/80 uppercase">Calculus</p>
            </div>
          </div>
          
          <div className="space-y-6 max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
            <p className="text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/50 pl-6">
              The enterprise-grade syllabus-aligned platform for the next generation of mathematicians. 
              Symbolic verification, AI tutoring, and secure examinations.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                 <ShieldCheck className="w-4 h-4" /> Symbolic Verification
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm">
                 <Lock className="w-4 h-4" /> Locked Exam Mode
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Login Card */}
        <div className="animate-in fade-in zoom-in-95 duration-700 delay-300">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-display font-bold">Access Portal</h2>
                <p className="text-muted-foreground text-sm">Select your role to authenticate</p>
              </div>

              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-black/20">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>Student ID</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9 bg-black/20 border-white/10" placeholder="ST-2024-XXXX" />
                    </div>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold" onClick={handleLogin}>
                    Enter Learning Deck <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>Faculty Email</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9 bg-black/20 border-white/10" placeholder="prof.name@institute.edu" />
                    </div>
                  </div>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold" onClick={handleLogin}>
                    Access Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-6">
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded text-sm text-destructive mb-4">
                    Restricted Access. All actions are audited.
                  </div>
                   <div className="space-y-2">
                    <Label>Admin Key</Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input type="password" className="pl-9 bg-black/20 border-white/10" placeholder="••••••••••••••" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10" onClick={handleLogin}>
                    Authenticate
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="pt-4 border-t border-white/5 text-center">
                 <Button variant="link" className="text-muted-foreground text-xs hover:text-primary" onClick={handleLogin}>
                   Continue as Guest (Limited Access)
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
