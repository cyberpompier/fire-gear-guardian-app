
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { EpiPage } from "./pages/EpiPage";
import { PersonnelPage } from "./pages/PersonnelPage";
import { VerificationsPage } from "./pages/VerificationsPage";
import { AlertsPage } from "./pages/AlertsPage";
import { ReportsPage } from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/epi" element={
            <Layout>
              <EpiPage />
            </Layout>
          } />
          <Route path="/personnel" element={
            <Layout>
              <PersonnelPage />
            </Layout>
          } />
          <Route path="/verifications" element={
            <Layout>
              <VerificationsPage />
            </Layout>
          } />
          <Route path="/alertes" element={
            <Layout>
              <AlertsPage />
            </Layout>
          } />
          <Route path="/rapports" element={
            <Layout>
              <ReportsPage />
            </Layout>
          } />
          <Route path="/archives" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Archives</h1>
                <p className="text-muted-foreground">Historique et archives - En développement</p>
              </div>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Paramètres</h1>
                <p className="text-muted-foreground">Configuration du système - En développement</p>
              </div>
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
