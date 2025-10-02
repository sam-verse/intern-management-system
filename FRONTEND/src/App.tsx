import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useScrollReveal } from "./hooks/use-scroll-reveal";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminInterns from "./pages/AdminInterns";
import AdminSettings from "./pages/AdminSettings";
import InternDashboard from "./pages/InternDashboard";
import InternProjects from "./pages/InternProjects";
import InternProjectDetail from "./pages/InternProjectDetail";
import InternProgress from "./pages/InternProgress";
import InternSettings from "./pages/InternSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.search, location.hash]);
  return null;
}

function RouteAnimations() {
  // Initialize GSAP-based reveal on route changes
  const location = useLocation();
  useScrollReveal();
  useEffect(() => {
    // trigger effect when path/query/hash changes
  }, [location.pathname, location.search, location.hash]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteAnimations />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/interns" element={<AdminInterns />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Intern Routes */}
          <Route path="/intern" element={<InternDashboard />} />
          <Route path="/intern/projects" element={<InternProjects />} />
          <Route path="/intern/projects/:id" element={<InternProjectDetail />} />
          <Route path="/intern/progress" element={<InternProgress />} />
          <Route path="/intern/settings" element={<InternSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
