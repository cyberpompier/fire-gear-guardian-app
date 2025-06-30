
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Clock, CheckCircle, Calendar } from "lucide-react";

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: "Expiration",
      title: "EPI arrivant à expiration",
      description: "Casque F1 - CSQ-2023-001 (Martin Dubois)",
      priority: "high",
      date: "Dans 3 jours",
      dueDate: "2024-02-15"
    },
    {
      id: 2,
      type: "Vérification",
      title: "Vérification en retard",
      description: "Tenue de feu - TF-2022-085 (Sophie Laurent)",
      priority: "medium",
      date: "En retard de 2 jours",
      dueDate: "2024-01-28"
    },
    {
      id: 3,
      type: "Maintenance",
      title: "Maintenance programmée",
      description: "ARI - ARI-2023-023 (Pierre Moreau)",
      priority: "low",
      date: "Demain",
      dueDate: "2024-02-01"
    },
    {
      id: 4,
      type: "Stock",
      title: "Stock faible",
      description: "Gants - Stock en dessous du seuil minimum",
      priority: "medium",
      date: "Maintenant",
      dueDate: "Immédiat"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Expiration': return 'text-red-600';
      case 'Vérification': return 'text-orange-600';
      case 'Maintenance': return 'text-blue-600';
      case 'Stock': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Centre d'alertes
          <Badge variant="destructive" className="ml-auto">
            {alerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(alert.priority)}`}>
                {getPriorityIcon(alert.priority)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${getTypeColor(alert.type)}`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={getPriorityColor(alert.priority)}
                  >
                    {alert.priority}
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-sm">{alert.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{alert.date}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ignorer
                    </Button>
                    <Button size="sm" className="rescue-gradient text-white">
                      Traiter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          Voir toutes les alertes
        </Button>
      </CardContent>
    </Card>
  );
}
