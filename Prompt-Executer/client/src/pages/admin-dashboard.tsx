import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload, Users, Zap, BarChart3, Shield, FileUp, CheckCircle2, AlertTriangle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const generationData = [
  { hour: "00:00", cost: 12, generated: 45 },
  { hour: "04:00", cost: 8, generated: 28 },
  { hour: "08:00", cost: 35, generated: 120 },
  { hour: "12:00", cost: 52, generated: 180 },
  { hour: "16:00", cost: 48, generated: 165 },
  { hour: "20:00", cost: 28, generated: 95 },
];

const coverageData = [
  { subtopic: "Derivatives", coverage: 92, target: 100 },
  { subtopic: "Integrals", coverage: 78, target: 100 },
  { subtopic: "Trig Identities", coverage: 65, target: 100 },
  { subtopic: "Vectors", coverage: 88, target: 100 },
  { subtopic: "Sequences", coverage: 72, target: 100 },
];

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold">Admin Control Panel</h1>
          <p className="text-muted-foreground">System monitoring, generation control, and platform administration</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="generation">Generation</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Users</p>
                    <p className="text-3xl font-bold">2,847</p>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">↑ 142 this week</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Questions Generated</p>
                    <p className="text-3xl font-bold">18.2K</p>
                    <Badge className="bg-primary/20 text-primary text-xs">$487 cost YTD</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Verified Questions</p>
                    <p className="text-3xl font-bold">16.8K</p>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">92% verification rate</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-500">34</p>
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Requires action</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Coverage Monitor */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle>Syllabus Coverage Monitor</CardTitle>
                <CardDescription>Question density vs. targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {coverageData.map((item) => (
                  <div key={item.subtopic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.subtopic}</span>
                      <span className="text-muted-foreground">{item.coverage}% / {item.target}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          item.coverage >= item.target
                            ? "bg-green-500"
                            : item.coverage >= 80
                            ? "bg-primary"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${(item.coverage / item.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generation Tab */}
          <TabsContent value="generation" className="space-y-4">
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle>Generation Job Control</CardTitle>
                <CardDescription>Monitor costs, capacity, and generation queue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Daily Cost Cap</Label>
                    <Input defaultValue="500" prefix="$" className="bg-black/20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Concurrent Jobs</Label>
                    <Input defaultValue="20" className="bg-black/20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Model Version</Label>
                    <Input defaultValue="gpt-4-turbo-math-v2" disabled className="bg-black/40 opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature (Exam Mode)</Label>
                    <Input defaultValue="0.0" disabled className="bg-black/40 opacity-50" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Zap className="w-4 h-4" /> Save Settings
                  </Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>

            {/* Hourly Cost Chart */}
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle>24-Hour Generation Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generationData}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="hour" stroke="rgba(255,255,255,0.3)" />
                    <YAxis yAxisId="left" stroke="rgba(255,255,255,0.3)" />
                    <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                    <Area yAxisId="left" type="monotone" dataKey="cost" stroke="hsl(var(--primary))" fill="url(#colorCost)" />
                    <Line yAxisId="right" type="monotone" dataKey="generated" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Uploads Tab */}
          <TabsContent value="uploads" className="space-y-4">
            <Card className="border-border bg-card/50 border-dashed">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <FileUp className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold mb-1">Upload Curriculum Assets</h3>
                    <p className="text-sm text-muted-foreground">PDF, DOCX, JSON syllabus specifications</p>
                  </div>
                  <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Upload className="w-4 h-4" /> Select File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card className="border-border bg-card/30">
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "UP-001", name: "IB_Core_Calculus_2024.pdf", type: "Syllabus", status: "processed", date: "2024-12-18" },
                  { id: "UP-002", name: "A_Level_Past_Papers_Nov24.docx", type: "Past Papers", status: "processing", date: "2024-12-17" },
                  { id: "UP-003", name: "AP_Calc_Questions.json", type: "Questions", status: "error", date: "2024-12-16" },
                ].map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-3 rounded bg-black/20 border border-border">
                    <div className="flex items-center gap-3">
                      <FileUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.type} • {u.date}</p>
                      </div>
                    </div>
                    <Badge className={
                      u.status === "processed" ? "bg-green-500/20 text-green-400" :
                      u.status === "processing" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }>
                      {u.status === "processed" && <CheckCircle2 className="w-3 h-3 mr-1 inline" />}
                      {u.status === "error" && <AlertTriangle className="w-3 h-3 mr-1 inline" />}
                      {u.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card className="border-border bg-card/30">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "USR-001", name: "Alice Johnson", role: "Teacher", org: "Stanford Prep", status: "active" },
                  { id: "USR-002", name: "Bob Chen", role: "Student", org: "Lincoln High", status: "active" },
                  { id: "USR-003", name: "Carol Singh", role: "Admin", org: "Galactic Calculus", status: "active" },
                  { id: "USR-004", name: "David Lee", role: "Parent", org: "N/A", status: "suspended" },
                ].map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-3 rounded bg-black/20 border border-border">
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.role} • {u.org}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={u.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {u.status}
                      </Badge>
                      <Button size="sm" variant="outline">Actions</Button>
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
