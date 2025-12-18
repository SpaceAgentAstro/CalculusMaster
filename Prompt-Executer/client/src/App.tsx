import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/student-dashboard";
import ReviewerWorkbench from "@/pages/reviewer-workbench";
import TeacherDashboard from "@/pages/teacher-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import GamesHub from "@/pages/games-hub";
import AiTutor from "@/pages/ai-tutor";
import MockExam from "@/pages/mock-exam";
import PlacementTest from "@/pages/placement-test";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/placement" component={PlacementTest} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/workbench" component={ReviewerWorkbench} />
      <Route path="/teacher" component={TeacherDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/games" component={GamesHub} />
      <Route path="/tutor" component={AiTutor} />
      <Route path="/exams" component={MockExam} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
