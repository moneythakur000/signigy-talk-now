import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SettingsMenu } from "./components/SettingsMenu";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("signifyX-user") !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
    setAuthChecked(true);
  }, []);
  
  if (!authChecked) {
    return null;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/learn" element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SettingsMenu />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
