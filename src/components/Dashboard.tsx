
import React from "react";
import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  shield, 
  users, 
  activity, 
  bell,
  alertTriangle,
  checkCircle,
  clock,
  archive
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total EPI",
      value: "1,247",
      description: "Équipements recensés",
      icon: shield,
      gradient: "fire-gradient",
      trend: { value: 5, isPositive: true }
    },
    {
      title: "Sapeurs-Pompiers",
      value: "89",
      description: "Personnel actif",
      icon: users,
      gradient: "emergency-gradient",
      trend: { value: 2, isPositive: true }
    },
    {
      title: "Vérifications",
      value: "23",
      description: "À effectuer cette semaine",
      icon: activity,
      gradient: "rescue-gradient",
      trend: { value: -12, isPositive: false }
    },
    {
      title: "Alertes",
      value: "7",
      description: "Équipements à renouveler",
      icon: bell,
      gradient: "fire-gradient",
      trend: { value: 3, isPositive: false }
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "Expiration",
      equipment: "Casque F1 - SP001",
      user: "Martin Dubois",
      priority: "high",
      date: "Dans 3 jours"
    },
    {
      id: 2,
      type: "Vérification",
      equipment: "Tenue feu - TF085",
      user: "Sophie Laurent",
      priority: "medium",
      date: "Aujourd'hui"
    },
    {
      id: 3,
      type: "Maintenance",
      equipment: "ARI - ARI023",
      user: "Pierre Moreau",
      priority: "low",
      date: "Demain"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return alertTriangle;
      case 'medium': return clock;
      case 'low': return checkCircle;
      default: return activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord EPI</h1>
        <p className="text-white/80">
          Bienvenue dans le système de gestion des équipements de protection individuelle
        </p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" size="sm">
            <activity className="w-4 h-4 mr-2" />
            Nouvelle vérification
          </Button>
          <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
            <archive className="w-4 h-4 mr-2" />
            Consulter les rapports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            gradient={stat.gradient}
            trend={stat.trend}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Recent Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <bell className="w-5 h-5 text-primary" />
              Alertes récentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => {
              const PriorityIcon = getPriorityIcon(alert.priority);
              return (
                <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(alert.priority)}`}>
                    <PriorityIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{alert.equipment}</p>
                    <p className="text-xs text-muted-foreground">{alert.user} • {alert.type}</p>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {alert.date}
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full mt-3" size="sm">
              Voir toutes les alertes
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <activity className="w-5 h-5 text-primary" />
              Actions rapides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12">
              <shield className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Ajouter un EPI</div>
                <div className="text-xs text-muted-foreground">Enregistrer un nouvel équipement</div>
              </div>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12">
              <users className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Nouveau sapeur-pompier</div>
                <div className="text-xs text-muted-foreground">Créer un profil personnel</div>
              </div>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12">
              <activity className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Planifier vérification</div>
                <div className="text-xs text-muted-foreground">Programmer un contrôle d'EPI</div>
              </div>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12">
              <archive className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Générer rapport</div>
                <div className="text-xs text-muted-foreground">Exporter les données</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
