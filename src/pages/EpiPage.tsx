
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search, 
  Plus,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function EpiPage() {
  const epiTypes = [
    "Casques",
    "Tenues de feu", 
    "Bottes",
    "Gants",
    "ARI (Appareils Respiratoires)",
    "Lampes",
    "Haches",
    "Cordes"
  ];

  const mockEpi = [
    {
      id: "EPI001",
      type: "Casque F1",
      serialNumber: "CSQ-2023-001",
      assignedTo: "Martin Dubois",
      status: "Bon état",
      lastCheck: "2024-01-15",
      nextCheck: "2024-07-15",
      statusColor: "green"
    },
    {
      id: "EPI002", 
      type: "Tenue de feu",
      serialNumber: "TF-2022-085",
      assignedTo: "Sophie Laurent",
      status: "À vérifier",
      lastCheck: "2023-12-10",
      nextCheck: "2024-01-10",
      statusColor: "orange"
    },
    {
      id: "EPI003",
      type: "ARI",
      serialNumber: "ARI-2023-023",
      assignedTo: "Pierre Moreau", 
      status: "À remplacer",
      lastCheck: "2024-01-01",
      nextCheck: "Expiré",
      statusColor: "red"
    }
  ];

  const getStatusBadge = (status: string, color: string) => {
    const variants = {
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200", 
      red: "bg-red-100 text-red-800 border-red-200"
    };
    
    return (
      <Badge variant="outline" className={variants[color as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des EPI</h1>
          <p className="text-muted-foreground">
            Équipements de Protection Individuelle
          </p>
        </div>
        <Button className="fire-gradient text-white border-0 hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel EPI
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher par numéro de série, type ou utilisateur..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtrer</Button>
            <Button variant="outline">Exporter</Button>
          </div>
        </CardContent>
      </Card>

      {/* EPI Types Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {epiTypes.map((type, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-shadow border-0 bg-gradient-to-br from-muted/50 to-muted/30"
          >
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">{type}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EPI List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Liste des équipements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEpi.map((epi) => (
              <div 
                key={epi.id}
                className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{epi.type}</h3>
                    {getStatusBadge(epi.status, epi.statusColor)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">N° série:</span>
                      <span className="font-mono">{epi.serialNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{epi.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Prochaine vérif: {epi.nextCheck}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    Vérifier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
