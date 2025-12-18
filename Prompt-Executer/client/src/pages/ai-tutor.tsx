import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MathInput } from "@/components/math-input";
import { Send, Brain, Lightbulb, BookOpen } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  type: "assistant" | "user";
  content: string;
  expanded?: boolean;
  steps?: Array<{
    title: string;
    content: string;
    latex: string;
  }>;
}

export default function AiTutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AI Tutor. I noticed you struggled with the chain rule on your last assignment. Would you like me to explain it step-by-step?",
    },
    {
      id: 2,
      type: "user",
      content: "Yes, please!",
    },
    {
      id: 3,
      type: "assistant",
      content: "Great! Let's break down the chain rule together.",
      expanded: true,
      steps: [
        {
          title: "Understanding the Chain Rule",
          content: "If you have a composite function f(g(x)), the derivative is: f'(g(x)) · g'(x)",
          latex: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
        },
        {
          title: "Example: Differentiate sin(x²)",
          content: "Outer function: sin(u), Inner function: u = x²",
          latex: "\\frac{d}{dx}[\\sin(x^2)] = \\cos(x^2) \\cdot 2x",
        },
        {
          title: "Your Turn to Practice",
          content: "Try differentiating: f(x) = (3x + 1)⁵",
          latex: "f(x) = (3x + 1)^5",
        },
      ],
    },
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "assistant",
          content: "That's a great attempt! Let me verify your answer using symbolic math...",
        },
      ]);
    }, 500);
  };

  return (
    <Layout>
      <div className="space-y-6 h-[calc(100vh-8rem)]">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" /> AI Tutor
          </h1>
          <p className="text-muted-foreground">Personalized step-by-step learning guidance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          
          {/* Sidebar: Topics & Recommendations */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <Card className="border-border bg-card/30 flex-1 flex flex-col min-h-0 overflow-hidden">
              <CardHeader className="border-b border-border/50 py-4">
                <CardTitle className="text-sm">Recommendations</CardTitle>
              </CardHeader>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                  {[
                    { topic: "Chain Rule", difficulty: "Medium", status: "struggling" },
                    { topic: "Integration by Parts", difficulty: "Hard", status: "trending" },
                    { topic: "Implicit Differentiation", difficulty: "Medium", status: "ready" },
                    { topic: "Trig Integrals", difficulty: "Hard", status: "ready" },
                  ].map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded border border-border bg-black/20 hover:bg-black/40 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">{rec.topic}</p>
                        <Badge variant="outline" className="text-xs">
                          {rec.difficulty}
                        </Badge>
                      </div>
                      <Badge
                        className={
                          rec.status === "struggling"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : rec.status === "trending"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }
                      >
                        {rec.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Main: Chat Interface */}
          <div className="lg:col-span-3 flex flex-col min-h-0 space-y-4">
            
            {/* Chat Messages */}
            <Card className="border-border bg-card/50 flex-1 flex flex-col min-h-0 overflow-hidden">
              <CardHeader className="border-b border-border/50 py-4">
                <CardTitle className="text-lg">Tutoring Session</CardTitle>
                <CardDescription>Learning path: Calculus → Differentiation → Chain Rule</CardDescription>
              </CardHeader>

              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-md lg:max-w-lg space-y-3 ${
                          msg.type === "user"
                            ? "bg-primary/20 border border-primary/30"
                            : "bg-secondary/10 border border-secondary/30"
                        } p-4 rounded-lg`}
                      >
                        <p className="text-sm">{msg.content}</p>

                        {msg.expanded && msg.steps && (
                          <div className="space-y-4 mt-4 pt-4 border-t border-border/50">
                            {msg.steps.map((step, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-primary/30 text-primary text-xs font-bold flex items-center justify-center">
                                    {idx + 1}
                                  </div>
                                  <h4 className="font-medium text-sm">{step.title}</h4>
                                </div>
                                <p className="text-xs text-muted-foreground pl-8">{step.content}</p>
                                <div className="pl-8 p-3 rounded bg-black/40 border border-border font-mono text-sm text-primary overflow-auto">
                                  {step.latex}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Math Practice Input */}
            <Card className="border-border bg-card/50">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Your Answer
                  </Label>
                  <MathInput placeholder="\frac{d}{dx}(3x + 1)^5 = " className="bg-black/20" />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="w-4 h-4" /> Check Answer
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Lightbulb className="w-4 h-4" /> Hint
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="w-4 h-4" /> Show Solution
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about this topic..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="bg-card border-border"
              />
              <Button onClick={handleSendMessage} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
