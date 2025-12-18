import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MathInput } from "@/components/math-input";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Brain, Trophy, Flame, Target, ChevronRight, Play, Lock, CheckCircle2 } from "lucide-react";
import badgeImg from "@assets/generated_images/gold_planet_achievement_badge.png";
import { cn } from "@/lib/utils";
import { useLocation, useSearch } from "wouter";
import { useEffect, useState } from "react";

const initialMasteryData = [
  { day: "Mon", score: 0 },
  { day: "Tue", score: 0 },
  { day: "Wed", score: 0 },
  { day: "Thu", score: 0 },
  { day: "Fri", score: 0 },
  { day: "Sat", score: 0 },
  { day: "Sun", score: 0 },
];

export default function Dashboard() {
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const isNewUser = searchParams.get("new_user") === "true";
  const initialScore = parseInt(searchParams.get("score") || "0");

  const [xp, setXp] = useState(isNewUser ? initialScore * 100 : 2450);
  const [level, setLevel] = useState(isNewUser ? Math.max(1, initialScore * 2) : 12);
  const [streak, setStreak] = useState(isNewUser ? 1 : 12);
  const [masteryData, setMasteryData] = useState(isNewUser ? initialMasteryData : [
      { day: "Mon", score: 45 },
      { day: "Tue", score: 52 },
      { day: "Wed", score: 48 },
      { day: "Thu", score: 61 },
      { day: "Fri", score: 55 },
      { day: "Sat", score: 67 },
      { day: "Sun", score: 72 },
  ]);

  const [missionProgress, setMissionProgress] = useState(65);
  const [missionInput, setMissionInput] = useState("\\frac{d}{dx}(3x^2 + 2x) = ");

  const handleMissionContinue = () => {
    if (missionProgress < 100) {
      setMissionProgress(Math.min(100, missionProgress + 15));
      setXp(prev => prev + 50);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Command Center</h1>
            <p className="text-muted-foreground">
              {isNewUser 
                ? "Welcome, Cadet. Your systems are online and calibrated." 
                : "Welcome back, Commander. Your calculus mastery is at 72%."
              }
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-card border border-border px-4 py-2 rounded-lg flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20" />
              <span className="font-mono font-bold text-lg">{streak}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Day Streak</span>
            </div>
            <div className="bg-card border border-border px-4 py-2 rounded-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
              <span className="font-mono font-bold text-lg">{xp.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">XP</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Stats & Mastery (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mastery Chart */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Synaptic Activity
                </CardTitle>
                <CardDescription>Weekly calculus problem solving performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={masteryData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Active Mission */}
            <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Current Mission: Derivatives</CardTitle>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold border",
                    missionProgress === 100 
                      ? "bg-green-500/20 text-green-400 border-green-500/30" 
                      : "bg-primary/20 text-primary border-primary/30"
                  )}>
                    {missionProgress === 100 ? "COMPLETED" : "IN PROGRESS"}
                  </span>
                </div>
                <CardDescription>Differentiation rules and applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono text-primary">{missionProgress}%</span>
                  </div>
                  <Progress value={missionProgress} className="h-2 bg-black/40" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Practice Input</Label>
                    <MathInput 
                      placeholder="\frac{d}{dx}(x^2)" 
                      value={missionInput}
                      onChange={setMissionInput}
                      className="bg-black/20" 
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <Button 
                      onClick={handleMissionContinue}
                      disabled={missionProgress === 100}
                      className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 group"
                    >
                      {missionProgress === 100 ? (
                        <>Mission Complete <CheckCircle2 className="w-5 h-5 ml-2" /></>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2 fill-current" /> Continue 
                          <ChevronRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Achievements & Next Up (1 col) */}
          <div className="space-y-6">
            
            {/* Next Up */}
            <Card className="bg-card/30 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Next Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Chain Rule Mastery", type: "Quiz", time: "15m", status: "pending" },
                  { title: "Implicit Differentiation", type: "Lesson", time: "25m", status: "locked" },
                  { title: "Mock Exam: Core 1", type: "Exam", time: "1h", status: "locked" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.status === "pending" ? "bg-primary animate-pulse" : "bg-muted-foreground"
                      )} />
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.type} • {item.time}</p>
                      </div>
                    </div>
                    {item.status === "locked" ? (
                      <Lock className="w-4 h-4 text-muted-foreground/50" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-to-b from-card/30 to-black/20 border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  Latest Badge
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center space-y-4">
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full group-hover:bg-secondary/40 transition-all duration-500" />
                  <img src={badgeImg} className="w-32 h-32 relative z-10 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" alt="Badge" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-secondary text-lg">Integration Pioneer</h3>
                  <p className="text-xs text-muted-foreground mt-1">Completed 50 integration problems with &gt;90% accuracy.</p>
                </div>
                <Button variant="outline" size="sm" className="w-full border-secondary/30 text-secondary hover:bg-secondary/10">
                  View Badge Case
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
}
