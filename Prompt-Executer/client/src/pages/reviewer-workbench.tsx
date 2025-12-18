import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertTriangle, FileText, Hash, Search, Filter } from "lucide-react";
import { MathInput } from "@/components/math-input";

const questions = [
  {
    id: "Q-GEN-2024-8921",
    topic: "Calculus.Differentiation.ChainRule",
    difficulty: "Hard",
    status: "pending_review",
    content: "Find the derivative of $f(x) = \\sin(\\ln(x^2 + 1))$",
    answer: "f'(x) = \\cos(\\ln(x^2 + 1)) \\cdot \\frac{2x}{x^2 + 1}",
    trace: {
      model: "gpt-4-turbo-math-v2",
      seed: 482910,
      cost: "$0.004",
      timestamp: "2024-12-18T10:45:00Z"
    },
    flags: []
  },
  {
    id: "Q-GEN-2024-8922",
    topic: "Algebra.Quadratics.ComplexRoots",
    difficulty: "Medium",
    status: "flagged",
    content: "Solve for x: $x^2 + 4x + 8 = 0$",
    answer: "x = -2 \\pm 2i",
    trace: {
      model: "claude-3-opus-math",
      seed: 112033,
      cost: "$0.012",
      timestamp: "2024-12-18T10:46:22Z"
    },
    flags: ["CAS_DIVERGENCE"]
  },
  {
    id: "Q-GEN-2024-8923",
    topic: "Statistics.Probability.Bayes",
    difficulty: "Hard",
    status: "verified",
    content: "Given $P(A|B) = 0.8$, $P(B) = 0.1$, and $P(A) = 0.2$, find $P(B|A)$.",
    answer: "0.4",
    trace: {
      model: "gpt-4-turbo-math-v2",
      seed: 99281,
      cost: "$0.003",
      timestamp: "2024-12-18T10:48:01Z"
    },
    flags: []
  }
];

export default function ReviewerWorkbench() {
  return (
    <Layout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Reviewer Workbench</h1>
            <p className="text-muted-foreground">Audit queue: 14 items pending verification.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" /> Search ID
            </Button>
          </div>
        </div>

        {/* Main Content - Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          
          {/* List Column */}
          <div className="lg:col-span-4 flex flex-col min-h-0 border border-border rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-black/20">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Queue</h3>
            </div>
            <ScrollArea className="flex-1">
              <div className="divide-y divide-border/50">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 hover:bg-white/5 cursor-pointer transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border">
                        {q.id}
                      </Badge>
                      {q.status === 'verified' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {q.status === 'flagged' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {q.status === 'pending_review' && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1" />}
                    </div>
                    <p className="font-medium text-sm mb-1 truncate">{q.topic}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 font-serif italic opacity-70">
                      {q.content}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Detail Column */}
          <div className="lg:col-span-8 flex flex-col min-h-0 space-y-4">
            <Card className="flex-1 flex flex-col min-h-0 bg-card/50 border-border shadow-2xl overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-black/20 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/50">HARD</Badge>
                    <span className="font-mono text-xs text-muted-foreground">Q-GEN-2024-8921</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button size="sm" variant="destructive" className="h-8 gap-2">
                       <XCircle className="w-4 h-4" /> Reject
                     </Button>
                     <Button size="sm" className="h-8 gap-2 bg-green-600 hover:bg-green-700 text-white">
                       <CheckCircle2 className="w-4 h-4" /> Verify & Sign
                     </Button>
                  </div>
                </div>
              </CardHeader>
              
              <div className="flex-1 overflow-auto p-6 space-y-8">
                {/* Question Display */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Question Stem
                  </h3>
                  <div className="p-6 rounded-lg border border-border bg-black/20 text-lg font-serif">
                    Find the derivative of <span className="font-mono text-primary bg-primary/10 px-1 rounded">\sin(\ln(x^2 + 1))</span>
                  </div>
                </div>

                {/* Answer Display */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Canonical Answer
                  </h3>
                  <MathInput 
                    readOnly 
                    value="f'(x) = \cos(\ln(x^2 + 1)) \cdot \frac{2x}{x^2 + 1}" 
                    className="bg-green-950/10 border-green-500/20"
                  />
                </div>

                {/* Audit Trail */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Hash className="w-4 h-4" /> Generation Trace
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded border border-border bg-black/20 space-y-1">
                      <span className="text-xs text-muted-foreground block">Model Version</span>
                      <span className="font-mono text-sm text-primary">gpt-4-turbo-math-v2</span>
                    </div>
                    <div className="p-3 rounded border border-border bg-black/20 space-y-1">
                      <span className="text-xs text-muted-foreground block">Random Seed</span>
                      <span className="font-mono text-sm text-secondary">482910</span>
                    </div>
                    <div className="p-3 rounded border border-border bg-black/20 space-y-1">
                      <span className="text-xs text-muted-foreground block">Generation Cost</span>
                      <span className="font-mono text-sm">$0.004</span>
                    </div>
                    <div className="p-3 rounded border border-border bg-black/20 space-y-1">
                      <span className="text-xs text-muted-foreground block">Timestamp</span>
                      <span className="font-mono text-sm">2024-12-18T10:45:00Z</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded border border-dashed border-border bg-black/10">
                    <span className="text-xs text-muted-foreground block mb-2">Prompt Hash</span>
                    <code className="text-xs font-mono break-all opacity-50">
                      sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </code>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
