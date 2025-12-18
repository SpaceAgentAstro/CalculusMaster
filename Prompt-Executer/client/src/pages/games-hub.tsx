import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Zap, Trophy, Users, Clock, Target, Flame, Crown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const games = [
  {
    id: "g-derivatives",
    name: "Derivative Duel",
    description: "Master differentiation rules in real-time",
    topic: "Calculus.Differentiation",
    players: "1v1",
    xp: 100,
    difficulty: "Medium",
    status: "live",
  },
  {
    id: "g-integration",
    name: "Integration Blitz",
    description: "Solve indefinite integrals under pressure",
    topic: "Calculus.Integration",
    players: "1v1 / Solo",
    xp: 150,
    difficulty: "Hard",
    status: "live",
  },
  {
    id: "g-algebra",
    name: "Algebra Arena",
    description: "Battle through equation solving",
    topic: "Algebra",
    players: "Team",
    xp: 80,
    difficulty: "Easy",
    status: "live",
  },
  {
    id: "g-trig",
    name: "Trigonometric Tower",
    description: "Climb the trig identity challenge",
    topic: "Trigonometry",
    players: "Solo",
    xp: 120,
    difficulty: "Medium",
    status: "coming",
  },
  {
    id: "g-vectors",
    name: "Vector Vortex",
    description: "Navigate 3D vector space challenges",
    topic: "Vectors",
    players: "1v1",
    xp: 180,
    difficulty: "Hard",
    status: "beta",
  },
  {
    id: "g-stats",
    name: "Stats Storm",
    description: "Probability puzzles and data analysis",
    topic: "Statistics",
    players: "Solo",
    xp: 100,
    difficulty: "Medium",
    status: "live",
  },
];

const leaderboard = [
  { rank: 1, name: "Phoenix_Coder", xp: 24500, level: 42, streak: 28 },
  { rank: 2, name: "Calculus_Master", xp: 22100, level: 41, streak: 15 },
  { rank: 3, name: "Math_Warrior", xp: 19800, level: 39, streak: 12 },
  { rank: 4, name: "AlgebraMage", xp: 18200, level: 38, streak: 8 },
  { rank: 5, name: "Quantum_Mind", xp: 17600, level: 37, streak: 5 },
];

export default function GamesHub() {
  const [isFindingMatch, setIsFindingMatch] = useState(false);

  const handleFindMatch = () => {
    setIsFindingMatch(true);
    setTimeout(() => {
      setIsFindingMatch(false);
      toast.success("Match Found!", {
        description: "Entering Derivative Duel vs. Calculus_Master...",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-2">
              <Gamepad2 className="w-8 h-8 text-primary" /> Games Arena
            </h1>
            <p className="text-muted-foreground">Master mathematics through competitive challenges</p>
          </div>
          <Button 
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleFindMatch}
            disabled={isFindingMatch}
          >
            {isFindingMatch ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Finding Match...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" /> Find Match
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="matches">My Matches</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => (
                <Card
                  key={game.id}
                  className="border-border bg-card/50 hover:bg-card/70 transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="group-hover:text-primary transition-colors">{game.name}</CardTitle>
                        <CardDescription>{game.description}</CardDescription>
                      </div>
                      <Badge className={
                        game.status === "live" ? "bg-green-500/20 text-green-400" :
                        game.status === "beta" ? "bg-blue-500/20 text-blue-400" :
                        "bg-muted text-muted-foreground"
                      }>
                        {game.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{game.topic}</Badge>
                      <Badge variant="outline" className="text-xs">{game.difficulty}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 rounded bg-black/30 border border-border">
                        <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{game.players}</p>
                      </div>
                      <div className="text-center p-2 rounded bg-black/30 border border-border">
                        <Zap className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-xs font-bold text-primary">{game.xp} XP</p>
                      </div>
                      <div className="text-center p-2 rounded bg-black/30 border border-border">
                        <Target className="w-4 h-4 mx-auto mb-1 text-secondary" />
                        <p className="text-xs text-secondary">Max Score</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all"
                      disabled={game.status === "coming"}
                      onClick={(e) => {
                         e.stopPropagation();
                         if (game.status !== "coming") handleFindMatch();
                      }}
                    >
                      {game.status === "coming" ? "Coming Soon" : "Play Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Matches Tab */}
          <TabsContent value="matches" className="space-y-4">
            <Card className="border-border bg-card/30">
              <CardHeader>
                <CardTitle>Active & Recent Matches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "M1", game: "Derivative Duel", opponent: "Calculus_Master", status: "in_progress", progress: 65 },
                  { id: "M2", game: "Integration Blitz", opponent: "Math_Warrior", status: "completed", result: "Won", score: "1200 / 1500" },
                  { id: "M3", game: "Algebra Arena", opponent: "AlgebraMage", status: "completed", result: "Lost", score: "980 / 1500" },
                ].map((m) => (
                  <div key={m.id} className="p-4 rounded border border-border bg-black/20 hover:bg-black/30 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{m.game}</p>
                        <p className="text-xs text-muted-foreground">vs {m.opponent}</p>
                      </div>
                      <Badge className={
                        m.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                        m.result === "Won" ? "bg-green-500/20 text-green-400" :
                        "bg-red-500/20 text-red-400"
                      }>
                        {m.status === "in_progress" ? "In Progress" : m.result}
                      </Badge>
                    </div>
                    {m.status === "in_progress" && (
                      <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                        <div className="h-full w-[65%] bg-primary" />
                      </div>
                    )}
                    {m.status === "completed" && (
                      <p className="text-sm text-muted-foreground">{m.score}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" /> Global Leaderboard
                </CardTitle>
                <CardDescription>Top mathematicians this season</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="flex items-center gap-4 p-4 rounded border border-border bg-black/20 hover:bg-black/30 transition-colors">
                    <div className="font-display font-bold text-2xl w-8 text-center">
                      {entry.rank === 1 && <span className="text-yellow-500">🥇</span>}
                      {entry.rank === 2 && <span className="text-gray-400">🥈</span>}
                      {entry.rank === 3 && <span className="text-orange-600">🥉</span>}
                      {entry.rank > 3 && <span className="text-muted-foreground">#{entry.rank}</span>}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary font-bold mb-1">
                        <Zap className="w-4 h-4" /> {entry.xp.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-orange-500 text-sm">
                        <Flame className="w-3 h-3" /> {entry.streak} day
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
