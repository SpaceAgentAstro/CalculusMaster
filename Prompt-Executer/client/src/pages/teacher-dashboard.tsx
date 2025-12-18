import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Users, BookMarked, BarChart3, Copy, QrCode, Trash2, Send } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const classData = [
  { id: "C-2024-001", name: "Core Calculus I", students: 28, joinCode: "CALC-X92F", status: "active" },
  { id: "C-2024-002", name: "Advanced Integration", students: 15, joinCode: "INTEG-K4L9", status: "active" },
  { id: "C-2024-003", name: "Differential Equations", students: 12, joinCode: "DIFFEQ-Z2M", status: "archived" },
];

const assignmentData = [
  { week: "W1", submitted: 20, graded: 18, avgScore: 72 },
  { week: "W2", submitted: 22, graded: 20, avgScore: 78 },
  { week: "W3", submitted: 25, graded: 23, avgScore: 81 },
  { week: "W4", submitted: 28, graded: 25, avgScore: 85 },
];

export default function TeacherDashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Classroom Command</h1>
            <p className="text-muted-foreground">Manage classes, assignments, and student progress</p>
          </div>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-5 h-5" /> Create Class
          </Button>
        </div>

        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classData.map((cls) => (
                <Card key={cls.id} className="border-border bg-card/50 hover:bg-card/70 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <CardDescription className="text-xs font-mono mt-1">{cls.id}</CardDescription>
                      </div>
                      <Badge className={cls.status === "active" ? "bg-green-500/20 text-green-400" : "bg-muted"}>
                        {cls.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded bg-black/20 border border-border">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Students</p>
                        <p className="font-bold text-lg">{cls.students}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">Join Code</Label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 rounded bg-black/30 border border-border font-mono text-sm text-primary font-bold">
                          {cls.joinCode}
                        </code>
                        <Button size="sm" variant="outline" className="h-10 w-10 p-0">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-10 w-10 p-0">
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Settings
                      </Button>
                      <Button size="sm" variant="outline" className="h-10 w-10 p-0 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Create Assignment
                  <Badge variant="outline">Beta</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class..." />
                      </SelectTrigger>
                      <SelectContent>
                        {classData.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Topic(s)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="derivatives">Derivatives</SelectItem>
                        <SelectItem value="integrals">Integrals</SelectItem>
                        <SelectItem value="trig">Trigonometry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulty Mix</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy (20% Med, 80% Easy)</SelectItem>
                        <SelectItem value="balanced">Balanced (30% Hard, 50% Med, 20% Easy)</SelectItem>
                        <SelectItem value="hard">Hard (70% Hard, 30% Med)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label># Questions</Label>
                    <Input type="number" defaultValue="10" min="1" max="50" />
                  </div>
                </div>

                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <BookMarked className="w-4 h-4" /> Generate Assignment
                </Button>
              </CardContent>
            </Card>

            {/* Recent Assignments */}
            <Card className="border-border bg-card/30">
              <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "A1", title: "Chain Rule Practice", class: "Core Calculus I", dueDate: "Tomorrow", submitted: "25/28" },
                  { id: "A2", title: "Integration by Parts", class: "Advanced Integration", dueDate: "Dec 22", submitted: "14/15" },
                  { id: "A3", title: "Weekly Quiz", class: "Core Calculus I", dueDate: "Dec 20", submitted: "28/28" },
                ].map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded bg-black/20 border border-border hover:border-primary/30 transition-colors">
                    <div>
                      <p className="font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.class} • Due: {a.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-primary">{a.submitted}</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle>Assignment Submission Trends</CardTitle>
                <CardDescription>Weekly submission and grading rates</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assignmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                    <Legend />
                    <Bar dataKey="submitted" fill="hsl(var(--primary))" />
                    <Bar dataKey="graded" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-3xl font-bold text-primary">82%</p>
                    <p className="text-xs text-green-400">↑ 3% from last week</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Submission Rate</p>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-xs text-green-400">↑ 5% from last week</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/30">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Active Students</p>
                    <p className="text-3xl font-bold">55</p>
                    <p className="text-xs text-muted-foreground">Across all classes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
