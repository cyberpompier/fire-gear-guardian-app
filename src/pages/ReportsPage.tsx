
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsOverview } from "@/components/stats/StatsOverview";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp
} from "lucide-react";

export function ReportsPage() {
  const epiStatusData = [
    { name: "Bon état", value: 156, color: "#22c55e" },
    { name: "À vérifier", value: 24, color: "#f59e0b" },
    { name: "À remplacer", value: 7, color: "#ef4444" },
  ];

  const verificationData = [
    { month: "Jan", verifications: 45, conformes: 42 },
    { month: "Fév", verifications: 52, conformes: 48 },
    { month: "Mar", verifications: 48, conformes: 45 },
    { month: "Avr", verifications: 61, conformes: 58 },
    { month: "Mai", verifications: 55, conformes: 51 },
    { month: "Jun", verifications: 58, conformes: 55 },
  ];

  const epiTypeData = [
    { type: "Casques", total: 45, conformes: 42 },
    { type: "Tenues", total: 38, conformes: 35 },
    { type: "ARI", total: 28, conformes: 26 },
    { type: "Bottes", total: 52, conformes: 48 },
    { type: "Gants", total: 34, conformes: 32 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rapports & Analyses</h1>
          <p className="text-muted-foreground">
            Statistiques et tendances des équipements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Période
          </Button>
          <Button className="flex items-center gap-2 rescue-gradient text-white">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Répartition par état
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={epiStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {epiStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* EPI by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Conformité par type d'EPI</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={epiTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#e2e8f0" name="Total" />
                <Bar dataKey="conformes" fill="#22c55e" name="Conformes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution des vérifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={verificationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="verifications" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Vérifications"
                />
                <Line 
                  type="monotone" 
                  dataKey="conformes" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Conformes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="fire-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Taux de conformité</p>
                <p className="text-3xl font-bold">94.3%</p>
              </div>
              <FileText className="w-8 h-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="emergency-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Vérifications ce mois</p>
                <p className="text-3xl font-bold">58</p>
              </div>
              <Calendar className="w-8 h-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="rescue-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Amélioration</p>
                <p className="text-3xl font-bold">+5.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
