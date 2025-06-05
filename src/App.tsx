
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import UploadResume from "./pages/UploadResume";
import InterviewGuidelines from "./pages/InterviewGuidelines";
import SetupRecording from "./pages/SetupRecording";
import Interview from "./pages/Interview";
import InterviewComplete from "./pages/InterviewComplete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload-resume" element={<UploadResume />} />
            <Route path="/interview-guidelines" element={<InterviewGuidelines />} />
            <Route path="/setup-recording" element={<SetupRecording />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/interview-complete" element={<InterviewComplete />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
