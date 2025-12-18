import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, Settings, Play, BookOpen, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MockExam() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsReady(true);
      toast.success("Exam Generated!", {
        description: "Your custom mock exam is ready for review.",
      });
    }, 2500);
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" /> Mock Exam Generator
          </h1>
          <p className="text-muted-foreground">Create custom practice exams tailored to your syllabus</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Builder */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Exam Builder
                  <Badge variant="outline">Live Preview</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Basic Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Basic Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Exam Name</Label>
                      <Input placeholder="e.g., Week 5 Practice" defaultValue="Core Calculus Mock Exam I" className="bg-black/20" />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Input type="number" defaultValue="90" min="15" max="300" className="bg-black/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Syllabus / Curriculum</Label>
                    <Select defaultValue="ib-core-2024">
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ib-core-2024">IB Core Calculus 2024</SelectItem>
                        <SelectItem value="ap-calc-ab">AP Calculus AB</SelectItem>
                        <SelectItem value="a-level-pure">A-Level Pure Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Question Mix */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">Question Configuration</h3>
                  
                  <div className="space-y-2">
                    <Label>Total Questions</Label>
                    <Input type="number" defaultValue="15" min="1" max="100" className="bg-black/20" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Difficulty Distribution</Label>
                      <span className="text-xs text-muted-foreground">(30/50/20 recommended)</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { level: "Easy", default: 3, color: "text-green-400" },
                        { level: "Medium", default: 7, color: "text-primary" },
                        { level: "Hard", default: 5, color: "text-orange-500" },
                      ].map((d) => (
                        <div key={d.level} className="flex items-center gap-2">
                          <Input
                            type="number"
                            defaultValue={d.default}
                            min="0"
                            className="w-16 bg-black/20 h-9"
                          />
                          <span className={`text-sm font-medium ${d.color}`}>{d.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3">
                    <Label>Topics to Include</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Derivatives",
                        "Integrals",
                        "Chain Rule",
                        "Product Rule",
                        "Integration by Parts",
                        "Trig Functions",
                        "Logarithms",
                        "Optimization",
                      ].map((topic) => (
                        <div key={topic} className="flex items-center gap-2">
                          <Checkbox defaultChecked />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advanced */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-bold uppercase tracking-wider">Advanced Options</h3>
                  
                  <div className="space-y-2">
                    <Label>Question Types</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <span className="text-sm">Multiple Choice</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <span className="text-sm">Free Response (Math Input)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked />
                        <span className="text-sm">Show Mark Scheme</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Randomization</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Randomize question order</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">Randomize parameter values</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11"
                    onClick={handleGenerate}
                    disabled={isGenerating || isReady}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                      </>
                    ) : isReady ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Exam Ready
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Generate & Preview
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 h-11" disabled={!isReady}>
                    <FileDown className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Coverage Report */}
          <div className="space-y-4">
            <Card className="border-border bg-card/30">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">Coverage Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { topic: "Derivatives", pct: 35 },
                  { topic: "Integrals", pct: 28 },
                  { topic: "Trig", pct: 20 },
                  { topic: "Optimization", pct: 17 },
                ].map((item) => (
                  <div key={item.topic} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{item.topic}</span>
                      <span className="text-primary">{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card/30">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">Exam Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Duration</span>
                  <span className="font-bold">90 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions</span>
                  <span className="font-bold">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Difficulty</span>
                  <span className="font-bold text-primary">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Question Bank</span>
                  <span className="font-bold text-secondary">4,200+</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-b from-green-950/20 to-black/20 border-green-500/20">
              <CardHeader className="py-4">
                <CardTitle className="text-sm text-green-400">✓ Ready to Generate</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>• All questions are verified</p>
                <p>• CAS checks complete</p>
                <p>• Bias audit passed</p>
                <p>• Ready for high-stakes use</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/30">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">Recent Exams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "Mock I", date: "Dec 15", students: 28 },
                  { name: "Mock II", date: "Dec 08", students: 24 },
                ].map((exam) => (
                  <div key={exam.name} className="flex justify-between items-center text-xs p-2 rounded bg-black/20 hover:bg-black/30 cursor-pointer">
                    <span className="font-medium">{exam.name}</span>
                    <span className="text-muted-foreground">{exam.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
