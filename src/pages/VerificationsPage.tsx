
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  activity, 
  calendar,
  checkCircle,
  alertTriangle,
  clock,
  user,
  shield
} from "lucide-react";

export function VerificationsPage() {
  const mockVerifications = [
    {
      id: "VER001",
      epiType: "Casque F1",
      serialNumber: "CSQ-2023-001",
      assignedTo: "Martin Dubois",
      dueDate: "2024-01-20",
      priority: "high",
      status: "À faire",
      lastCheck: "2023-07-20"
    },
    {
      id: "VER002",
      epiType: "Tenue de feu", 
      serialNumber: "TF-2022-085",
      assignedTo: "Sophie Laurent",
      dueDate: "2024-01-25",
      priority: "medium",
      status: "En cours",
      lastCheck: "2023-07-25"
    },
    {
      id: "VER003",
      epiType: "ARI",
      serialNumber: "ARI-2023-023", 
      assignedTo: "Pierre Moreau",
      dueDate: "2024-01-30",
      priority: "low",
      status: "Planifiée",
      lastCheck: "2023-07-30"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'À faire': return 'bg-red-100 text-red-800 border-red-200';
      case 'En cours': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Planifiée': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Terminée': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vérifications</h1>
          <p className="text-muted-foreground">
            Contrôles périodiques des EPI
          </p>
        </div>
        <Button className="rescue-gradient text-white border-0 hover:opacity-90">
          <activity className="w-4 h-4 mr-2" />
          Nouvelle vérification
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <alertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">23</p>
                <p className="text-sm text-muted-foreground">À faire</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <clock className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <calendar className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">8</p>
                <p className="text-sm text-muted-foreground">Planifiées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <checkCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-sm text-muted-foreground">Ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <activity className="w-5 h-5 text-primary" />
            Vérifications en cours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVerifications.map((verification) => (
              <div 
                key={verification.id}
                className="flex flex-col lg:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold">{verification.epiType}</h3>
                    <Badge 
                      variant="outline" 
                      className={getPriorityColor(verification.priority)}
                    >
                      Priorité {verification.priority}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(verification.status)}
                    >
                      {verification.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Numéro de série</p>
                      <p className="font-mono font-medium">{verification.serialNumber}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Assigné à</p>
                      <div className="flex items-center gap-1">
                        <user className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{verification.assignedTo}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Échéance</p>
                      <div className="flex items-center gap-1">
                        <calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{verification.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 lg:flex-col">
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                    Commencer
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                    Détails
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
