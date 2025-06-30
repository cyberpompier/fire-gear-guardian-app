
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users
} from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      title: "Conformité EPI",
      value: 87,
      total: 100,
      unit: "%",
      trend: { value: 5, isPositive: true },
      status: "good"
    },
    {
      title: "Vérifications à jour",
      value: 156,
      total: 180,
      unit: "équipements",
      trend: { value: -3, isPositive: false },
      status: "warning"
    },
    {
      title: "Personnel formé",
      value: 78,
      total: 89,
      unit: "sapeurs",
      trend: { value: 8, isPositive: true },
      status: "good"
    },
    {
      title: "Alertes actives",
      value: 7,
      total: null,
      unit: "notifications",
      trend: { value: 2, isPositive: false },
      status: "alert"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600";
      case "warning": return "text-orange-600";
      case "alert": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return CheckCircle;
      case "warning": return Clock;
      case "alert": return AlertTriangle;
      default: return Users;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const StatusIcon = getStatusIcon(stat.status);
        const percentage = stat.total ? (stat.value / stat.total) * 100 : 0;
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <StatusIcon className={`w-4 h-4 ${getStatusColor(stat.status)}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
              
              {stat.total && (
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {stat.value} sur {stat.total}
                  </div>
                </div>
              )}
              
              <div className={`flex items-center gap-1 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {stat.trend.isPositive ? '+' : ''}{stat.trend.value}% ce mois
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
