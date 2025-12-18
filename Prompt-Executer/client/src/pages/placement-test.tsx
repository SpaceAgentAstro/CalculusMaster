import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation } from "wouter";
import { Brain, ChevronRight, CheckCircle2, Target, Sparkles } from "lucide-react";
import { MathInput } from "@/components/math-input";

const questions = [
  {
    id: 1,
    question: "What is the derivative of f(x) = x²?",
    type: "choice",
    options: ["x", "2x", "x²", "2"],
    correct: "2x",
    topic: "Derivatives"
  },
  {
    id: 2,
    question: "Evaluate the integral: ∫ 2x dx",
    type: "choice",
    options: ["x² + C", "2x² + C", "x + C", "2x + C"],
    correct: "x² + C",
    topic: "Integrals"
  },
  {
    id: 3,
    question: "Solve for x: 2x + 5 = 13",
    type: "input",
    correct: "4",
    topic: "Algebra"
  },
  {
    id: 4,
    question: "What is the value of sin(π/2)?",
    type: "choice",
    options: ["0", "1", "-1", "0.5"],
    correct: "1",
    topic: "Trigonometry"
  },
  {
    id: 5,
    question: "If f(x) = eˣ, what is f'(x)?",
    type: "choice",
    options: ["x·eˣ⁻¹", "eˣ", "x", "ln(x)"],
    correct: "eˣ",
    topic: "Calculus"
  }
];

export default function PlacementTest() {
  const [_, setLocation] = useLocation();
  const [step, setStep] = useState(0); // 0: Intro, 1-N: Questions, N+1: Results
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const currentQuestion = questions[step - 1];
  const progress = step > 0 ? ((step - 1) / questions.length) * 100 : 0;

  const handleStart = () => setStep(1);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsCalibrating(true);
    // Calculate score
    let newScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) newScore++;
    });
    setScore(newScore);

    // Simulate "Calibration" delay
    setTimeout(() => {
      setIsCalibrating(false);
      setStep(questions.length + 1);
    }, 2000);
  };

  const handleComplete = () => {
    // Navigate to dashboard with state (simulated via query param for now, 
    // real app would use context/store)
    setLocation(`/dashboard?new_user=true&score=${score}`);
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <Card className="w-full max-w-lg border-primary/20 bg-card/60 backdrop-blur-xl relative z-10 animate-in zoom-in-95 duration-500">
          <CardHeader className="text-center space-y-4 pt-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display font-bold">System Calibration</CardTitle>
            <CardDescription className="text-lg">
              Welcome, Cadet. Before we assign your first mission, we need to calibrate your difficulty settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8 px-8">
            <div className="space-y-3 bg-black/20 p-4 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-secondary" />
                <span className="text-sm">5 Diagnostic Questions</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">Adapts to your skill level</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm">Unlocks your personalized curriculum</span>
              </div>
            </div>

            <Button onClick={handleStart} className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
              Begin Calibration <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCalibrating) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 space-y-8">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping" />
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
          <Brain className="absolute inset-0 m-auto w-12 h-12 text-primary animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-bold animate-pulse">Analyzing Neural Patterns...</h2>
          <p className="text-muted-foreground">Constructing your knowledge graph</p>
        </div>
      </div>
    );
  }

  if (step > questions.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-background to-background" />
        
        <Card className="w-full max-w-lg border-green-500/30 bg-card/60 backdrop-blur-xl relative z-10 animate-in slide-in-from-bottom-10 duration-700">
          <CardHeader className="text-center space-y-2 pt-8">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/20 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <CardTitle className="text-3xl font-display font-bold text-green-400">Calibration Complete</CardTitle>
            <CardDescription className="text-lg">
              You correctly answered {score} out of {questions.length} questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pb-8 px-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting Level</p>
                <p className="text-3xl font-bold text-primary">{Math.max(1, score * 2)}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Initial XP</p>
                <p className="text-3xl font-bold text-yellow-500">{score * 100}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">Based on your results, we've unlocked:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">Algebra Refresher</span>
                {score > 2 && <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs text-secondary">Intro to Limits</span>}
                {score > 3 && <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400">Derivatives I</span>}
              </div>
            </div>

            <Button onClick={handleComplete} className="w-full h-12 text-lg font-bold bg-green-500 text-green-950 hover:bg-green-400 shadow-lg shadow-green-500/20">
              Enter Dashboard <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout showNav={false}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
        
        {/* Progress Header */}
        <div className="w-full mb-8 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-display font-bold">Diagnostic Question {step}</h1>
              <p className="text-muted-foreground">{currentQuestion.topic}</p>
            </div>
            <span className="font-mono text-primary font-bold">{step}/{questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="w-full border-border bg-card/60 backdrop-blur-xl animate-in fade-in slide-in-from-right-10 duration-300" key={step}>
          <CardContent className="p-8 space-y-8">
            <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === "choice" ? (
              <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion.id]} className="space-y-4">
                {currentQuestion.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`opt-${idx}`} className="border-primary text-primary" />
                    <Label htmlFor={`opt-${idx}`} className="flex-1 p-4 rounded-lg border border-white/10 bg-black/20 hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-all">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-4">
                <Label>Your Answer</Label>
                <MathInput 
                  placeholder="Enter your answer..." 
                  className="bg-black/20 text-lg p-4 h-14"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(val) => handleAnswer(val)}
                />
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button 
                onClick={handleNext} 
                disabled={!answers[currentQuestion.id]}
                className="px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {step === questions.length ? "Finish Test" : "Next Question"} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
}
